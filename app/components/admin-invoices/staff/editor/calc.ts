import type { EditorItem, EditorState, EditorTerm } from "./types";
import { getNumber, round2 } from "./utils";

/* AddEditInvoiceProvider.js's calculations, as pure functions of the
   editor state. Same arithmetic (and the same rounding) as the source. */

/** getSubTotal: (placements || quantity) × amount, items with a type only. */
export const getSubTotal = (s: Pick<EditorState, "invoiceItems">, items?: EditorItem[]) =>
    (items ?? s.invoiceItems)
        .map((item) => (item.adItem ? (item.placements.length || item.quantity) * item.amount : 0))
        .reduce((total, value) => total + value, 0);

/** getTotalDiscount: every placement's discount, read through getNumber. */
export const getTotalDiscount = (s: Pick<EditorState, "invoiceItems">, items?: EditorItem[]) =>
    (items ?? s.invoiceItems).reduce(
        (total, item) =>
            total +
            item.placements.reduce(
                (sum, p) => sum + getNumber("discount" in p && p.discount !== undefined ? p.discount : "0").value,
                0,
            ),
        0,
    );

/** getInvoiceTotal: subtotal + upcharge − discount. */
export const getInvoiceTotal = (s: Pick<EditorState, "invoiceItems" | "upcharge">) =>
    parseFloat(String(getSubTotal(s))) + parseFloat(String(s.upcharge)) - getTotalDiscount(s);

/** getPaymentTotal: the positive payments. */
export const getPaymentTotal = (s: Pick<EditorState, "payments">) =>
    (s.payments ?? []).reduce((total, p) => (p.amount > 0 ? total + p.amount : total), 0);

export const getBalanceTotal = (s: EditorState) => getInvoiceTotal(s) - getPaymentTotal(s);

/** getSubTotalOfSelected: the selected items' (unit) amounts. */
export const getSubTotalOfSelected = (s: EditorState) =>
    s.invoiceItems.reduce((total, item) => (s.selected.includes(item.id) ? total + item.amount : total), 0);

/** recomputePaymentTerms: puts any difference from the total on the last
    term. Like the source, the rebuilt terms drop `id` and `is_changed`. */
export const recomputePaymentTerms = (s: EditorState): EditorTerm[] => {
    const total = getInvoiceTotal(s);
    let balance = total;
    return s.paymentTerms.map((obj, key) => {
        let amount_due = obj.amount_due;
        balance = balance - obj.amount_due;
        if (key === s.paymentTerms.length - 1 && balance !== 0) amount_due += balance;
        return { due_date: obj.due_date, amount_due: round2(amount_due), amount_paid: obj.amount_paid };
    });
};

/** buildPaymentTerms: grows/shrinks the terms to paymentCount and splits
    what the paid or hand-edited terms don't cover evenly over the rest,
    the rounding remainder going on the last term. */
export const buildPaymentTerms = (s: EditorState): EditorTerm[] => {
    const { paymentCount } = s;
    let total = getInvoiceTotal(s);
    const termsWithPayment: number[] = [];
    let totalAmountDueOfTermsWithPayment = 0;

    s.paymentTerms.forEach((obj, id) => {
        if (obj.amount_paid > 0 || obj.is_changed) {
            totalAmountDueOfTermsWithPayment += obj.amount_due;
            termsWithPayment.push(id);
        }
    });
    if (termsWithPayment.length > 0) total -= totalAmountDueOfTermsWithPayment;

    let terms: EditorTerm[] = s.paymentTerms.slice(0, Math.max(paymentCount, 0));
    if (s.paymentTerms.length < paymentCount) {
        terms = s.paymentTerms.concat(
            Array.from({ length: paymentCount - s.paymentTerms.length }, () => ({
                due_date: "",
                amount_due: 0,
                amount_paid: 0,
            })),
        );
    }

    return terms.map((obj, key) => {
        if (obj && !termsWithPayment.includes(key)) {
            let amount_due = obj.amount_due;
            const due_date = "due_date" in obj ? obj.due_date : "";
            if (!("is_changed" in obj)) {
                amount_due = round2(total / (paymentCount - termsWithPayment.length));
                if (key === terms.length - 1) {
                    amount_due =
                        amount_due +
                        round2(
                            total -
                                Number(
                                    (amount_due * (terms.length - termsWithPayment.length)).toFixed(2),
                                ),
                        );
                }
            }
            return { due_date, amount_due: round2(amount_due), amount_paid: obj.amount_paid };
        }
        return obj;
    });
};

/** updatePlacementDiscount: spreads each selected item's discount over its
    placements (floored to the cent, the remainder on the last one). */
export const updatePlacementDiscount = (s: EditorState): EditorItem[] =>
    s.invoiceItems.map((item) => {
        if (!(s.selected.includes(item.id) && item.quantity > 0)) return item;
        const n = item.placements.length;
        const placements = item.placements.map((placement, pid) => {
            const remainder = (Math.floor(item.discount * 100) % n) / 100;
            const discount =
                pid === n - 1
                    ? Math.floor((item.discount / n + remainder) * 100) / 100
                    : Math.floor((item.discount / n) * 100) / 100;
            return { ...placement, discount };
        });
        return { ...item, placements };
    });

/** BulkCTAHeader / InvoiceBody updateRanking. */
export const updateRanking = (items: EditorItem[]) =>
    items.map((obj, key) => ({ ...obj, ranking: key + 1 }));
