"use client";

import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import Button from "../../shared/Button";

export default function StepThankYou() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-fern-200/70 text-fern-700">
                <FiCheck className="h-10 w-10" />
            </span>
            <h1 className="mt-6 text-2xl font-bold text-slate-900">
                Congratulations! 🎉
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-500">
                Your program has been submitted for review. Our team will publish
                it within 1–2 business days, and you&apos;ll get an email when it
                goes live.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link href="/admin/programs">
                    <Button variant="cobalt">View Program Listings</Button>
                </Link>
                <Link href="/admin/programs/new">
                    <Button variant="outline">Create Another Listing</Button>
                </Link>
            </div>
        </div>
    );
}
