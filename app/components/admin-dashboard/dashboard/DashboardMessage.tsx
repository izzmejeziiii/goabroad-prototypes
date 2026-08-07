import Link from "next/link";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { provider } from "../data";

export default function DashboardMessage() {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {/* Advertise With Us */}
            <Card title="Advertise With Us">
                <p className="text-sm text-slate-600">
                    Boost your exposure and take your online marketing to the
                    next level with a custom advertising package!
                </p>
                <a
                    href="https://www.goabroad.com/advertise-guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block"
                >
                    <Button variant="outline">Advertise Guide</Button>
                </a>
            </Card>

            {/* Balance Summary */}
            <Card title="Balance Summary">
                <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Amount Due:</span>
                        <span className="font-semibold text-slate-900">
                            ${provider.balanceDue.toLocaleString()}.00
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Due Date:</span>
                        <span className="font-semibold text-slate-900">
                            {provider.dueDate}
                        </span>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <Link href="/admin/invoices/1/pay">
                        <Button variant="cta" size="sm">
                            Pay Now
                        </Button>
                    </Link>
                    <Link href="/admin/invoices/1">
                        <Button variant="outline" size="sm">
                            View Invoice
                        </Button>
                    </Link>
                </div>
            </Card>

            {/* Message / welcome */}
            <Card title="Message">
                <div className="space-y-3 text-sm text-slate-600">
                    <p>
                        Welcome to your new GoAbroad Account! We&apos;re excited
                        to help you build your business by expanding your reach
                        and visibility with your target market on{" "}
                        <a
                            className="font-medium text-brand-600 hover:underline"
                            href="https://www.goabroad.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GoAbroad.com
                        </a>
                        .
                    </p>
                    <p>
                        For an overview of your new account features, please{" "}
                        <a
                            className="font-medium text-brand-600 hover:underline"
                            href="#"
                        >
                            click here
                        </a>
                        .
                    </p>
                    <p>
                        If you ever have any questions about how your account
                        works, just click on the phone icon in the upper right to
                        get in touch with your personal account manager.
                    </p>
                    <p>
                        Don&apos;t forget to{" "}
                        <a
                            className="font-medium text-brand-600 hover:underline"
                            href="#"
                        >
                            sign up for our Partner Newsletter
                        </a>{" "}
                        to stay up to date!
                    </p>
                </div>
            </Card>
        </div>
    );
}
