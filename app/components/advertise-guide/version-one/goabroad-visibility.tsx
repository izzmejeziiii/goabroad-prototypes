import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function GoabroadVisibility() {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center my-14">
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0">
                <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                    How Visibility Works on GoAbroad
                </h2>
                <div className="flex flex-col w-full gap-16">
                    <div className="grid md:grid-cols-2 lg:flex items-center w-full gap-10">
                        <div className="flex flex-col gap-10">
                            <div className="space-y-2">
                                <p className="text-slate-700">
                                    Before selecting placements, it’s important
                                    to understand how users move through our
                                    platform.
                                </p>
                                <p className="text-slate-700 font-bold">
                                    Our visitors typically:
                                </p>
                                <ul className="space-y-2 text-slate-700 ml-2">
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            Arrive via high-intent search
                                            queries
                                        </p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            Filter by program type, destination,
                                            and duration
                                        </p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>Compare multiple providers</p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            Read reviews, FAQs, and provider
                                            profiles
                                        </p>
                                    </li>
                                    <li className="flex gap-2 items-start">
                                        <IoIosCheckmarkCircleOutline
                                            size={20}
                                            className="shrink-0 mt-1 text-cobalt-500"
                                        />
                                        <p>
                                            Return multiple times before
                                            submitting an inquiry
                                        </p>
                                    </li>
                                </ul>
                                <p className="text-slate-700">
                                    Advertising on GoAbroad places your
                                    organization directly within the research
                                    and decision process.
                                </p>
                                <p className="text-slate-700">
                                    Our platform has a{" "}
                                    <strong>
                                        long-standing authority in international
                                        education
                                    </strong>{" "}
                                    built over nearly three decades, which means
                                    visibility on GoAbroad contributes not only
                                    to traffic, but to trust signals that
                                    influence both search engines and AI-powered
                                    discovery systems.
                                </p>
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
                            src="https://res.cloudinary.com/gacom/image/upload/v1773285401/images2/advertisePage/visibility.png"
                            alt=""
                            width={700}
                            height={337}
                            className="rounded-lg lg:max-w-175 w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
