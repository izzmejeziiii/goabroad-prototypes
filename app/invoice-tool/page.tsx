import LookupForm from "../components/invoice-tool/LookupForm";
import { cardLimitLabel } from "../components/invoice-tool/data";
import { BrandBand, bodyPad, lede, pageTitle } from "../components/invoice-tool/ui";

const steps = [
    "We find your invoice and show exactly what's due. No account or login needed.",
    `Pay by bank transfer, international wire, Wise or PayPal, whichever is easiest for your team. Card works for amounts up to ${cardLimitLabel}.`,
    "Card payments are marked paid right away. For transfers, we match your payment and email you once it's recorded.",
];

export default function InvoiceLookupPage() {
    return (
        <>
            <BrandBand step={1} />
            <div className={bodyPad}>
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
                    <div className="flex min-w-0 flex-col gap-10">
                        <div className="flex flex-col gap-3">
                            <h1 className={pageTitle}>Pay Your GoAbroad Invoice</h1>
                            <p className={lede}>
                                Enter the invoice number and the email address we sent it
                                to. You&rsquo;ll see exactly what&rsquo;s due before you
                                choose how to pay.
                            </p>
                        </div>
                        <LookupForm />
                    </div>

                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h2 className="text-lg font-semibold text-slate-900">
                                How It Works
                            </h2>
                            <ol aria-label="How it works" className="flex flex-col gap-4">
                                {steps.map((text, i) => (
                                    <li key={text} className="flex gap-3">
                                        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-cobalt-500 text-xs font-bold text-white">
                                            {i + 1}
                                        </span>
                                        <span className="text-[15px] leading-relaxed text-slate-700">
                                            {text}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
