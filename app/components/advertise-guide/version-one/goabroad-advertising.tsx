import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import {
    LuBadgeCheck,
    LuBrainCircuit,
    LuSearch,
    LuTarget,
} from "react-icons/lu";

export default function GoabroadAdvertising() {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center my-14 px-4 md:px-6 lg:px-8 xl:px-0">
            <div className="w-full max-w-7xl flex flex-col items-center gap-8 justify-center">
                <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                    How GoAbroad Advertising Supports <br />{" "}
                    <span className="text-cobalt-500">
                        SEO & AI Discoverability
                    </span>
                </h2>
                <div className="space-y-4 text-slate-700">
                    <p>
                        As AI-driven discovery becomes more prominent,
                        authoritative third-party citations matter. Visibility
                        within GoAbroad{" "}
                        <strong>strengthens your digital footprint</strong>{" "}
                        beyond your own website. This means the value of
                        partnering with us compounds over time.
                    </p>
                    <p>
                        Advertising on GoAbroad does more than generate clicks;
                        GoAbroad is a high-authority domain within international
                        education, so your presence on our platform contributes
                        to:
                    </p>
                </div>
                <div className="w-full grid sm:grid-cols-2 gap-8">
                    <div className="border border-gray-300 w-full rounded-lg relative bg-slate-50 p-6 overflow-hidden">
                        <div className="bg-primary-100/70 rounded-full w-16 h-16 absolute -top-6 -right-6"></div>
                        <div className="space-y-4 w-full text-slate-700">
                            <div className="bg-primary-100 text-cobalt-500 p-3 rounded-md w-fit">
                                <LuBadgeCheck size={22} />
                            </div>
                            <div className="space-y-1">
                                <p>
                                    <strong>Brand Credibility</strong>
                                </p>
                                <p>
                                    Increased brand association within trusted
                                    industry contexts
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-300 w-full rounded-lg relative bg-slate-50 p-6 overflow-hidden">
                        <div className="bg-primary-100/70 rounded-full w-16 h-16 absolute -top-6 -right-6"></div>
                        <div className="space-y-4 w-full text-slate-700">
                            <div className="bg-primary-100 text-cobalt-500 p-3 rounded-md w-fit">
                                <LuSearch size={22} />
                            </div>
                            <div className="space-y-1">
                                <p>
                                    <strong>Search Discoverability</strong>
                                </p>
                                <p>
                                    Enhanced discoverability through structured,
                                    crawlable content
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-300 w-full rounded-lg relative bg-slate-50 p-6 overflow-hidden">
                        <div className="bg-primary-100/70 rounded-full w-16 h-16 absolute -top-6 -right-6"></div>
                        <div className="space-y-4 w-full text-slate-700">
                            <div className="bg-primary-100 text-cobalt-500 p-3 rounded-md w-fit">
                                <LuTarget size={22} />
                            </div>
                            <div className="space-y-1">
                                <p>
                                    <strong>High-Intent Visibility</strong>
                                </p>
                                <p>
                                    Visibility within high-intent search
                                    environments
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-300 w-full rounded-lg relative bg-slate-50 p-6 overflow-hidden">
                        <div className="bg-primary-100/70 rounded-full w-16 h-16 absolute -top-6 -right-6"></div>
                        <div className="space-y-4 w-full text-slate-700">
                            <div className="bg-primary-100 text-cobalt-500 p-3 rounded-md w-fit">
                                <LuBrainCircuit size={22} />
                            </div>
                            <div className="space-y-1">
                                <p>
                                    <strong>AI Citation Potential</strong>
                                </p>
                                <p>
                                    Greater likelihood of being referenced in
                                    AI-generated summaries and recommendation
                                    models
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link
                    href="https://blog.goabroad.com/how-goabroad-is-evolving-for-the-ai-era/"
                    target="_blank"
                    className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                >
                    Learn How We&apos;re Evolving
                    <HiArrowSmRight
                        size={16}
                        className="transition-all duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    );
}
