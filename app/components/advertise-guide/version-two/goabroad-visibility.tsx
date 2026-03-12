import Link from "next/link";
import {
    FiCheckCircle,
    FiFilter,
    FiRefreshCcw,
    FiSearch,
} from "react-icons/fi";
import { HiArrowSmRight } from "react-icons/hi";
import { LuGitCompare } from "react-icons/lu";

export default function GoabroadVisibility() {
    return (
        <section className="w-full bg-slate-100 h-full flex flex-col items-center justify-center mt-14 py-16">
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0">
                <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                    How Visibility Works on GoAbroad
                </h2>
                <div className="flex flex-col w-full gap-16">
                    <div className=" lg:flex items-center w-full gap-10">
                        <div className="flex flex-col gap-10">
                            <p className="text-slate-700">
                                Before selecting placements, it’s important to
                                understand how users move through our platform.
                                Our visitors typically:
                            </p>
                            <div className="w-full grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="border border-gray-300 rounded-2xl p-6 text-slate-700 hover:-translate-y-2 hover:shadow-md hover:shadow-primary-50 transition-all duration-250 space-y-4 bg-white">
                                    <div className="p-3 rounded-md bg-primary-50 w-fit">
                                        <FiSearch
                                            size={20}
                                            className="text-cobalt-500"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold">
                                            High-Intent Discovery
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            Arrive via high-intent search
                                            queries
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-2xl p-6 text-slate-700 hover:-translate-y-2 hover:shadow-md hover:shadow-primary-50 transition-all duration-250 space-y-4 bg-white">
                                    <div className="p-3 rounded-md bg-primary-50 w-fit">
                                        <FiFilter
                                            size={20}
                                            className="text-cobalt-500"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold">
                                            Smart Program Filtering
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            Filter by program type, destination,
                                            and duration
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-2xl p-6 text-slate-700 hover:-translate-y-2 hover:shadow-md hover:shadow-primary-50 transition-all duration-250 space-y-4 bg-white">
                                    <div className="p-3 rounded-md bg-primary-50 w-fit">
                                        <LuGitCompare
                                            size={20}
                                            className="text-cobalt-500"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold">
                                            Provider Comparison
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            Compare multiple providers
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-2xl p-6 text-slate-700 hover:-translate-y-2 hover:shadow-md hover:shadow-primary-50 transition-all duration-250 space-y-4 bg-white">
                                    <div className="p-3 rounded-md bg-primary-50 w-fit">
                                        <FiCheckCircle
                                            size={20}
                                            className="text-cobalt-500"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold">
                                            Research & Validation
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            Read reviews, FAQs, and provider
                                            profiles
                                        </p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 rounded-2xl p-6 text-slate-700 hover:-translate-y-2 hover:shadow-md hover:shadow-primary-50 transition-all duration-250 space-y-4 bg-white">
                                    <div className="p-3 rounded-md bg-primary-50 w-fit">
                                        <FiRefreshCcw
                                            size={20}
                                            className="text-cobalt-500"
                                        />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="font-bold">
                                            Return Visits
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            Return multiple times before
                                            submitting an inquiry
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-2xl flex flex-col md:flex-row gap-12 items-center p-10">
                                <p className="text-gray-300">
                                    Advertising on GoAbroad places your
                                    organization directly within the research
                                    and decision process. Our platform has a{" "}
                                    <span className="font-bold text-white">
                                        long-standing authority in international
                                        education
                                    </span>{" "}
                                    built over nearly three decades, which means
                                    visibility on GoAbroad contributes not only
                                    to traffic, but to trust signals that
                                    influence both search engines and AI-powered
                                    discovery systems.
                                </p>
                                <Link
                                    href="https://www.goabroad.com/about"
                                    className="rounded-md text-white py-3 px-6 bg-roman-500 hover:bg-red-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex leading-relaxed h-fit items-center gap-1.5 w-max shrink-0"
                                >
                                    Read More About Us
                                    <HiArrowSmRight
                                        size={16}
                                        className="transition-all duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
