import Link from "next/link";
import Button from "@/app/components/admin-dashboard/shared/Button";
import { FormField, Input } from "@/app/components/admin-dashboard/shared/Form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-6 flex justify-center">
                    <span className="inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                            alt="GoAbroad"
                            className="h-8 w-auto object-contain"
                        />
                    </span>
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-xl">
                    <h1 className="text-xl font-bold text-slate-900">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Sign in to your provider portal.
                    </p>

                    <div className="mt-6 space-y-4">
                        <FormField label="Email">
                            <Input
                                type="email"
                                placeholder="you@yourorg.org"
                                defaultValue="marisol@globaltrekvolunteers.org"
                            />
                        </FormField>
                        <FormField label="Password">
                            <Input type="password" defaultValue="prototype" />
                        </FormField>
                        <div className="flex justify-end">
                            <Link
                                href="/admin/forgot-password"
                                className="text-sm font-medium text-brand-600 hover:text-brand-700"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Link href="/admin/dashboard" className="block">
                            <Button variant="primary" className="w-full">
                                Sign in
                            </Button>
                        </Link>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-white/60">
                    Prototype — any credentials work. Signs you in as access
                    level 1 (client / provider).
                </p>
            </div>
        </div>
    );
}
