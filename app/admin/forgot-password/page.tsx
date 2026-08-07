import Link from "next/link";
import Button from "@/app/components/admin-dashboard/shared/Button";
import { FormField, Input } from "@/app/components/admin-dashboard/shared/Form";

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h1 className="text-xl font-bold text-slate-900">
                    Reset your password
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Enter your email and we&apos;ll send you a reset link.
                </p>

                <div className="mt-6 space-y-4">
                    <FormField label="Email">
                        <Input type="email" placeholder="you@yourorg.org" />
                    </FormField>
                    <Link href="/admin/login" className="block">
                        <Button variant="primary" className="w-full">
                            Send reset link
                        </Button>
                    </Link>
                    <Link
                        href="/admin/login"
                        className="block text-center text-sm font-medium text-slate-500 hover:text-brand-600"
                    >
                        Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
