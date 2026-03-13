import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import {
    IoIosCheckmarkCircle,
    IoIosCheckmarkCircleOutline,
} from "react-icons/io";

export default function WhyGoAbroadWorks() {
    return (
        <section className="w-full">
            <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                Why GoAbroad Works
            </h2>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-175">
                <div className="flex flex-col gap-4 w-full mb-11 h-full justify-between">
                    <div className="space-y-4">
                        <h3 className="text-[22px] font-bold text-slate-800">
                            Get Visibility Where Trust Is Established
                        </h3>
                        <p className="text-slate-700">
                            For over 25 years, GoAbroad has been one of the most
                            trusted resources in international education. Our
                            platform is cited, referenced, and relied upon by
                            thousands of students, educators, advisors, and
                            institutions worldwide each month.
                        </p>
                    </div>
                    <div className="w-full bg-linear-to-r mt-6 lg:mt-0 flex flex-col justify-between from-blue-900 h-full max-h-117.5 to-cobalt-500 rounded-lg p-8 text-white">
                        <div className="space-y-4">
                            <p>
                                When your organization is featured on GoAbroad,
                                you benefit from:
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
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
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
                                    />
                                    <p>
                                        <strong>Contextual relevance</strong>{" "}
                                        within expert-curated content
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
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
                        <Link
                            href="https://www.goabroad.com/about"
                            className="rounded-md text-cobalt-500 py-3 px-6 bg-white hover:bg-roman-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                        >
                            Read More About Us
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col w-full mb-11 h-full justify-between">
                    <div className="space-y-4">
                        <h3 className="text-[22px] font-bold text-slate-800">
                            Power Your SEO & AI Discoverability
                        </h3>
                        <p className="text-slate-700">
                            GoAbroad listings are designed to do more than rank;
                            they also help your brand become <i>referenced</i>.
                        </p>
                    </div>
                    <div className="w-full shadow-lg mt-6 lg:mt-0 rounded-lg p-8 h-full flex flex-col justify-between max-h-117.5 text-slate-700">
                        <div className="space-y-4">
                            <p>Presence on GoAbroad contributes to your:</p>
                            <ul className="space-y-4 mb-4">
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="text-cobalt-500 shrink-0 mt-1"
                                    />
                                    <p>
                                        <strong>Organic visibility</strong> for
                                        high-intent search queries
                                    </p>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircleOutline
                                        size={20}
                                        className="text-cobalt-500 shrink-0 mt-1"
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
                                        className="text-cobalt-500 shrink-0 mt-1"
                                    />
                                    <p>
                                        <strong>LLM and AI mentions</strong> as
                                        models increasingly rely on
                                        authoritative sources like GoAbroad for
                                        recommendations and summaries
                                    </p>
                                </li>
                            </ul>
                            <p className="mb-8">
                                The benefits don’t disappear when ad spend
                                stops; they compound in value over time.
                            </p>
                        </div>
                        <Link
                            href="https://blog.goabroad.com/how-goabroad-is-evolving-for-the-ai-era/"
                            target="_blank"
                            className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-roman-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                        >
                            Learn How We&apos;re Evolving
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col h-full justify-between w-full mb-2">
                    <div className="space-y-4">
                        <h3 className="text-[22px] font-bold text-slate-800">
                            Designed for Long-Term Growth
                        </h3>
                        <p className="text-slate-700">
                            Whether your goal is lead generation, SEO growth,
                            brand trust, or all three, GoAbroad can help you get
                            there faster and more sustainably.
                        </p>
                    </div>
                    <div className="w-full bg-linear-to-r from-blue-900 flex flex-col justify-between h-full max-h-117.5 to-cobalt-500 rounded-lg p-8 text-white mt-6 lg:mt-0">
                        <div className="space-y-4">
                            <p>Advertising on GoAbroad is an investment in:</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
                                    />
                                    Sustainable organic growth
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
                                    />
                                    Brand authority that compounds over time
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
                                    />
                                    Search and AI visibility that extends beyond
                                    your own site
                                </li>
                                <li className="flex gap-2 items-start">
                                    <IoIosCheckmarkCircle
                                        size={20}
                                        className="shrink-0 mt-1"
                                    />
                                    A reputation built alongside an industry
                                    leader
                                </li>
                            </ul>
                        </div>
                        <Link
                            href="https://www.goabroad.com/verification"
                            className="rounded-md text-cobalt-500 py-3 px-6 bg-white hover:bg-roman-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                        >
                            Learn About Our Verification System
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
