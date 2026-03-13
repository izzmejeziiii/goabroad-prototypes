import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function WhyGoAbroadWorks() {
    return (
        <section className="w-full h-full">
            <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                Why GoAbroad Works
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(405px,1fr))] w-full gap-8">
                <div className="flex flex-col gap-10 w-full h-full justify-between items-center transition-shadow duration-300 border border-gray-300 rounded-lg hover:shadow-lg p-8">
                    <div className="space-y-4">
                        <h3 className="text-slate-800 font-bold text-[22px] text-center">
                            Get Visibility Where Trust Is Established
                        </h3>
                        <div className="space-y-2">
                            <p className="text-slate-700">
                                For over 25 years, GoAbroad has been one of the
                                most trusted resources in international
                                education. Our platform is cited, referenced,
                                and relied upon by thousands of students,
                                educators, advisors, and institutions worldwide
                                each month.
                            </p>
                            <p className="text-slate-700">
                                When your organization is featured on GoAbroad,
                                you benefit from:
                            </p>
                            <ul className="space-y-2 text-slate-700 ml-2">
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        <strong>
                                            High-authority domain signals
                                        </strong>{" "}
                                        that strengthen EEAT (Experience,
                                        Expertise, Authoritativeness,
                                        Trustworthiness)
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        <strong>Contextual relevance</strong>{" "}
                                        within expert-curated content
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        <strong>
                                            Association with a globally
                                            recognized brand
                                        </strong>{" "}
                                        in education and travel
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link
                        href="https://www.goabroad.com/about"
                        className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center"
                    >
                        Read More About Us
                        <HiArrowSmRight
                            size={16}
                            className="transition-all duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                <div className="flex flex-col gap-10 w-full h-full justify-between items-center transition-shadow duration-300 border border-gray-300 rounded-lg hover:shadow-lg p-8">
                    <div className="space-y-4">
                        <h3 className="text-slate-800 font-bold text-[22px] text-center">
                            Power Your SEO & AI Discoverability
                        </h3>
                        <div className="space-y-2">
                            <p className="text-slate-700">
                                GoAbroad listings are designed to do more than
                                rank; they also help your brand become{" "}
                                <i>referenced</i>.
                            </p>
                            <p className="text-slate-700">
                                Presence on GoAbroad contributes to your:
                            </p>
                            <ul className="space-y-2 text-slate-700 ml-2">
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        <strong>Organic visibility</strong> for
                                        high-intent search queries
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        <strong>
                                            Available structured, crawlable
                                            content
                                        </strong>{" "}
                                        that search engines trust
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        <strong>LLM and AI mentions</strong> as
                                        models increasingly rely on
                                        authoritative sources like GoAbroad for
                                        recommendations and summaries
                                    </p>
                                </li>
                            </ul>
                            <p className="text-slate-700">
                                The benefits don’t disappear when ad spend
                                stops; they compound in value over time.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="https://blog.goabroad.com/how-goabroad-is-evolving-for-the-ai-era/"
                        target="_blank"
                        className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center"
                    >
                        Learn How We&apos;re Evolving
                        <HiArrowSmRight
                            size={16}
                            className="transition-all duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                <div className="flex flex-col gap-10 w-full h-full justify-between items-center transition-shadow duration-300 border border-gray-300 rounded-lg hover:shadow-lg p-8">
                    <div className="space-y-4">
                        <h3 className="text-slate-800 font-bold text-[22px] text-center">
                            Designed for Long-Term Growth
                        </h3>
                        <div className="space-y-2">
                            <p className="text-slate-700">
                                Whether your goal is lead generation, SEO
                                growth, brand trust, or all three, GoAbroad can
                                help you get there faster and more sustainably.
                            </p>
                            <p className="text-slate-700">
                                Advertising on GoAbroad is an investment in:
                            </p>
                            <ul className="space-y-2 text-slate-700 ml-2">
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        Sustainable{" "}
                                        <strong>organic growth</strong>
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        Brand authority that{" "}
                                        <strong>compounds</strong> over time
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        Search and AI visibility that extends{" "}
                                        <strong>beyond your own site</strong>
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="shrink-0 mt-1 text-cobalt-500"
                                    />
                                    <p>
                                        A reputation built alongside an{" "}
                                        <strong>industry leader</strong>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link
                        href="https://www.goabroad.com/verification"
                        className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center"
                    >
                        Learn About Our Verification System
                        <HiArrowSmRight
                            size={16}
                            className="transition-all duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
