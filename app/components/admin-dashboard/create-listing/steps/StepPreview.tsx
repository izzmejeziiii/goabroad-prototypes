"use client";

import { FiCheck, FiClock, FiMapPin, FiTag } from "react-icons/fi";
import Stars from "../../shared/Stars";

const highlights = [
    "Work alongside local nurses in community clinics",
    "Weekend excursions to Machu Picchu & the Sacred Valley",
    "Homestay with a vetted Peruvian family",
    "Full in-country orientation and 24/7 support",
    "Certificate of completion",
];

export default function StepPreview() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Program Preview
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Here&apos;s how travelers will see your listing on GoAbroad.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {/* Hero */}
                <div className="bg-gradient-to-br from-cobalt-500 to-cobalt-700 px-8 py-10 text-white">
                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                        Volunteer Abroad
                    </span>
                    <h2 className="mt-3 text-2xl font-bold">
                        Community Health Volunteer
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/90">
                        <span className="flex items-center gap-1.5">
                            <FiMapPin className="h-4 w-4" /> Cusco, Peru
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiClock className="h-4 w-4" /> 1–12 weeks
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiTag className="h-4 w-4" /> from $1,240
                        </span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-sun-500 px-4 py-2 text-sm font-semibold text-slate-900">
                            Apply Now
                        </span>
                        <span className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold">
                            Inquire Here
                        </span>
                        <span className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold">
                            Visit Website
                        </span>
                    </div>
                </div>

                {/* Body */}
                <div className="grid gap-8 px-8 py-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <section>
                            <h3 className="text-lg font-semibold text-slate-900">
                                About this program
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                Support local clinics and community health
                                campaigns alongside Peruvian nurses in and around
                                Cusco. This program is ideal for pre-health
                                students and anyone passionate about global
                                health.
                            </p>
                        </section>
                        <section>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Program Highlights
                            </h3>
                            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                                {highlights.map((h) => (
                                    <li
                                        key={h}
                                        className="flex items-start gap-2 text-sm text-slate-600"
                                    >
                                        <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-fern-600" />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Gallery
                            </h3>
                            <div className="mt-2 grid grid-cols-3 gap-2">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="aspect-video rounded-lg bg-slate-100"
                                    />
                                ))}
                            </div>
                        </section>
                        <section>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Reviews
                            </h3>
                            <div className="mt-2 space-y-3">
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-800">
                                            Emily Carter
                                        </span>
                                        <Stars rating={5} />
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">
                                        &ldquo;Life-changing month working
                                        alongside local nurses.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-xl border border-slate-200 p-5">
                            <h4 className="text-sm font-semibold text-slate-800">
                                Quick Details
                            </h4>
                            <dl className="mt-3 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-slate-400">Locations</dt>
                                    <dd className="text-slate-700">Cusco</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400">Availability</dt>
                                    <dd className="text-slate-700">Year Round</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400">Starts At</dt>
                                    <dd className="text-slate-700">$1,240</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400">Age</dt>
                                    <dd className="text-slate-700">All ages</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="rounded-xl border border-slate-200 p-5">
                            <h4 className="text-sm font-semibold text-slate-800">
                                Awards
                            </h4>
                            <div className="mt-3 flex gap-2">
                                {["2025", "2024"].map((y) => (
                                    <span
                                        key={y}
                                        className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-sun-200/60 text-[10px] font-bold text-sun-700"
                                    >
                                        ★<span>{y}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
