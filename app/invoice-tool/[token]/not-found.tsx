import Link from "next/link";
import { BrandBand, bodyPad, lede, pageTitle } from "../../components/invoice-tool/ui";

export default function InvoiceLinkNotFound() {
    return (
        <>
            <BrandBand />
            <div className={bodyPad + " flex flex-col gap-3"}>
                <h1 className={pageTitle}>We Couldn&rsquo;t Open That Invoice</h1>
                <p className={lede}>
                    The link may be mistyped or out of date.{" "}
                    <Link
                        href="/invoice-tool"
                        className="font-semibold text-cobalt-500 underline underline-offset-2 hover:text-cobalt-700"
                    >
                        Start again
                    </Link>{" "}
                    with your invoice number and email.
                </p>
            </div>
        </>
    );
}
