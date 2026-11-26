"use client";

/* Copies src/views/Client/Invoices/AddEditInvoice/PaymentsDetail.js: the
   "Payment History" list (date, amount) under the payment terms, shown on
   an existing invoice once it has payments. */

import clsx from "clsx";
import { Divider, SUBTITLE2 } from "../../mui";
import { toCurrency } from "../../format";
import { useEditor } from "./EditorContext";
import { formatMDY } from "./utils";

/** subtitle1 */
const SUBTITLE1 = "m-0 text-base font-normal leading-[1.75] tracking-[0.00938em] text-[#424242]";
/** `value`: 600, #333. */
const VALUE = clsx(SUBTITLE1, "text-center !font-semibold !text-[#333]");

const Col = ({ span, children }: { span: 2 | 4; children?: React.ReactNode }) => (
    <div
        className={clsx(
            "box-border m-0 grow-0",
            span === 2 ? "max-w-[16.666667%] basis-1/6" : "max-w-[33.333333%] basis-1/3",
        )}
    >
        {children}
    </div>
);

const PaymentsDetail = () => {
    const { state } = useEditor();
    const { payments } = state;
    let partialPayment = 0;
    if (!state.is_new) partialPayment = payments.reduce((sum, obj) => sum + obj.amount, partialPayment);

    if (state.is_new || partialPayment === 0) return null;

    return (
        <>
            <Divider className="my-4" />
            <div className="flex items-center">
                <div className="-ml-2 -mt-2 box-border flex w-[calc(100%+8px)] flex-wrap">
                    <div className="box-border m-0 flex w-full max-w-full basis-full flex-wrap pl-2 pt-2">
                        <div className="box-border flex w-full flex-wrap">
                            <h6 className={clsx(SUBTITLE1, "mb-[0.35em]")}>Payment History</h6>
                            <div className="grow" />
                        </div>
                        <div className="box-border flex w-full max-w-full basis-full flex-wrap">
                            <div className="box-border flex w-full max-w-full basis-full flex-wrap">
                                <Col span={4} />
                                <Col span={2}>
                                    <h6 className={clsx(SUBTITLE2, "m-0 text-center")}>Payment Date</h6>
                                </Col>
                                <Col span={2}>
                                    <h6 className={clsx(SUBTITLE2, "m-0 text-center")}>Payment Amount</h6>
                                </Col>
                                <Col span={4} />
                            </div>
                            {payments.map((obj) => (
                                <div key={obj.id} className="box-border flex w-full max-w-full basis-full flex-wrap">
                                    <Col span={4} />
                                    <Col span={2}>
                                        <h6 className={VALUE}>{formatMDY(obj.date_created)}</h6>
                                    </Col>
                                    <Col span={2}>
                                        <h6 className={VALUE}>{toCurrency(obj.amount)}</h6>
                                    </Col>
                                    <Col span={4} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentsDetail;
