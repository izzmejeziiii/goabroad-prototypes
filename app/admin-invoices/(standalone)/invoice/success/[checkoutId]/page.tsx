import { Suspense } from "react";
import PaymentSuccess from "../../../../../components/admin-invoices/view/PaymentSuccess";

/* /invoice/success/:checkout_id: where Stripe Checkout returns. */
export default async function PaymentSuccessPage({ params }: { params: Promise<{ checkoutId: string }> }) {
    const { checkoutId } = await params;
    return (
        <Suspense fallback={null}>
            <PaymentSuccess checkoutId={checkoutId} />
        </Suspense>
    );
}
