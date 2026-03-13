import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function WhyGoAbroadWorks() {
    return (
        <section className="w-full h-full">
            <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                Why GoAbroad Works
            </h2>
            <div className="flex flex-col w-full gap-16">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(381px,1fr))] lg:flex items-center w-full gap-10">
                    <div className="flex flex-col gap-10">
                        <h3 className="text-slate-800 font-bold text-[22px]">
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
                        <Link
                            href="https://www.goabroad.com/about"
                            className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                        >
                            Read More About Us
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                    <Image
                        src="https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png"
                        alt=""
                        width={700}
                        height={337}
                        className="rounded-lg lg:max-w-175 w-full"
                    />
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(381px,1fr))] lg:flex items-center w-full gap-10">
                    <Image
                        src="https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/provider.png"
                        alt=""
                        width={650}
                        height={449.5}
                        className="rounded-lg order-2 md:order-1 lg:max-w-162.5 w-full"
                    />
                    <div className="flex flex-col gap-10 md:order-2 order-1">
                        <div className="space-y-4">
                            <h3 className="text-slate-800 font-bold text-[22px]">
                                Power Your SEO & AI Discoverability
                            </h3>
                            <div className="space-y-2">
                                <p className="text-slate-700">
                                    GoAbroad listings are designed to do more
                                    than rank; they also help your brand become{" "}
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
                                            <strong>Organic visibility</strong>{" "}
                                            for high-intent search queries
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
                                            <strong>LLM and AI mentions</strong>{" "}
                                            as models increasingly rely on
                                            authoritative sources like GoAbroad
                                            for recommendations and summaries
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
                            className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                        >
                            Learn How We&apos;re Evolving
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(381px,1fr))] lg:flex items-center w-full gap-10">
                    <div className="flex flex-col gap-10">
                        <div className="space-y-4">
                            <h3 className="text-slate-800 font-bold text-[22px]">
                                Designed for Long-Term Growth
                            </h3>
                            <div className="space-y-2">
                                <p className="text-slate-700">
                                    Whether your goal is lead generation, SEO
                                    growth, brand trust, or all three, GoAbroad
                                    can help you get there faster and more
                                    sustainably.
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
                                        <p>Sustainable organic growth</p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            Brand authority that compounds over
                                            time
                                        </p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            Search and AI visibility that
                                            extends beyond your own site
                                        </p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            A reputation built alongside an
                                            industry leader
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Link
                            href="https://www.goabroad.com/verification"
                            className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                        >
                            Learn About Our Verification System
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                    <Image
                        src="https://images.goabroad.com/image/upload/v1771824161/images2/advertisePage/article.png"
                        alt=""
                        width={650}
                        height={400}
                        className="rounded-lg lg:max-w-162.5 w-full"
                    />
                </div>
            </div>
        </section>
    );
}
