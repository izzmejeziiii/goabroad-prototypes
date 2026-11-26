import type { PaymentMethod } from "../../types";

/* PaymentDrawer / EditPaymentDrawer's PAYMENT_TYPES, and how they line up
   with the demo payments' payment_method. The API stores a payment_type id;
   the demo stores the method's name, so the ids are mapped both ways. */

export const PAYMENT_TYPES = [
    { value: 3, label: "Bank Transfer" },
    { value: 1, label: "Check" },
    { value: 4, label: "Paypal" },
    { value: 2, label: "Credit Card" },
    { value: 5, label: "Other" },
];

/** The demo has no "Other" or plain "Bank Transfer" method, so Other is
    stored as the label itself and Bank Transfer as Wire Transfer. */
export const TYPE_TO_METHOD: Record<number, PaymentMethod> = {
    3: "Wire Transfer",
    1: "Check",
    4: "PayPal",
    2: "Credit Card",
    5: "Other" as PaymentMethod,
};

/** Online ACH payments carry a type the drawer's list doesn't have, so its
    Payment Type box starts empty, as payment_type 0 does in the real one. */
export const methodToType = (method: string) =>
    ({ "Wire Transfer": 3, Check: 1, PayPal: 4, "Credit Card": 2, Zelle: 5, Other: 5 })[method];
