import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { PiRocket } from "react-icons/pi";
import Breadcrumbs from "../../reusable/breadcrumbs";

export default function HeroSection() {
    return (
        <section className="relative h-screen lg:h-[70vh] w-full">
            <Image
                src="https://images.unsplash.com/photo-1422004694183-cd2f8c55d4d9?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hero section image"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/80 w-full h-full"></div>
            <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center">
                <div className="w-full max-w-7xl h-full lg:p-8 xl:p-0 md:p-6 p-4 relative flex flex-col justify-center">
                    <Breadcrumbs
                        isAbsolute
                        link="advertise"
                        page="Advertise"
                        isDarkBg
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full h-fit">
                        <div className="flex flex-col">
                            <h1 className="text-4xl font-bold text-white">
                                How to Partner with GoAbroad
                            </h1>
                            <h2 className="text-lg text-white mt-3">
                                Where Global Education & Travel Brands Grow
                                Authority, Visibility & Demand
                            </h2>
                            <div className="flex gap-2 mt-8">
                                <Link
                                    href="https://www.goabroad.com/contact/advertise"
                                    className="bg-cobalt-500 text-white py-3 px-6 flex gap-1.5 items-center rounded-md hover:bg-cobalt-700 transition-all ease-in-out duration-300 group font-semibold"
                                >
                                    Contact Us{" "}
                                    <HiArrowSmRight
                                        size={16}
                                        className="transition-all duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                                <Link
                                    href="https://sales.goabroad.com/widget/booking/zWN1KGFmuUm1C8Qd0hrh"
                                    className="border border-white rounded-md text-white py-3 px-6 hover:bg-white bg-transparent transition-colors duration-300 font-semibold hover:text-cobalt-500"
                                >
                                    Book A Demo
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 lg:hover:bg-white/15 transition-all duration-300 lg:hover:scale-[1.02]">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-cobalt-100 rounded-md p-3 text-white w-fit">
                                            <PiRocket size={24} />
                                        </div>
                                        <span className="text-cobalt-100 font-semibold">
                                            Authority Engine
                                        </span>
                                    </div>
                                    <p className="text-white">
                                        GoAbroad isn’t just an advertising
                                        platform; it’s an authority engine for
                                        organizations in the international
                                        education, travel, and global learning
                                        space.
                                    </p>
                                    <hr className="border-none w-full h-px bg-white/20" />
                                    <p className="text-white">
                                        By listing your programs and
                                        organization on GoAbroad.com, you’ll
                                        gain more than exposure. You’ll build
                                        search authority, brand credibility, and
                                        discoverability across traditional
                                        search engines and AI-powered discovery
                                        platforms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
