"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import Card from "../shared/Card";
import Button from "../shared/Button";
import { masterSearchTypes } from "../staff-data";

export default function MasterSearch() {
    const router = useRouter();
    const [type, setType] = useState(masterSearchTypes[0]);
    const [q, setQ] = useState("");

    return (
        <Card title="Master Search">
            <p className="-mt-1 mb-3 text-sm text-slate-500">
                Search across Client Accounts and Listings.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.push("/admin/staff/clients");
                }}
                className="flex flex-col gap-2 sm:flex-row"
            >
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 sm:w-48"
                >
                    {masterSearchTypes.map((t) => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={`Search by ${type.toLowerCase()}…`}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30"
                />
                <Button type="submit" icon={FiSearch}>
                    Search
                </Button>
            </form>
        </Card>
    );
}
