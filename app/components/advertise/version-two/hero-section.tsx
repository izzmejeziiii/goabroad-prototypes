import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import Breadcrumbs from "../../reusable/breadcrumbs";

export default function HeroSection() {
    return (
        <section className="w-full h-screen lg:h-[70vh] bg-slate-200 flex flex-col items-center relative justify-center">
            <Image
                src="https://res.cloudinary.com/gacom/image/upload/v1771494487/images2/advertisePage/advertise-travel-pattern.png"
                width={1000}
                height={500}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-[0.05]"
            />
            <Breadcrumbs isAbsolute link="advertise" page="Advertise" />
            <div className="flex flex-col items-center justify-center absolute inset-0 w-full h-full px-4">
                <div className="text-slate-800 max-w-4xl text-center flex flex-col gap-12 items-center justify-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-[42px] font-bold">
                            How to Partner with GoAbroad
                        </h1>
                        <h2 className="font-semibold text-2xl">
                            Where Global Education & Travel Brands Grow
                            Authority, Visibility & Demand
                        </h2>
                        <div className="space-y-1 text-slate-700">
                            <p>
                                GoAbroad isn’t just an advertising platform;
                                it’s an authority engine for organizations in
                                the international education, travel, and global
                                learning space. By listing your programs and
                                organization on GoAbroad.com, you’ll gain more
                                than exposure. You’ll build search authority,
                                brand credibility, and discoverability across
                                traditional search engines and AI-powered
                                discovery platforms.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-8">
                        <Link
                            href="https://www.goabroad.com/contact/advertise"
                            className="bg-cobalt-500 text-white py-3 px-6 flex gap-1.5 items-center rounded-md hover:bg-roman-500 transition-all ease-in-out duration-300 group font-semibold"
                        >
                            Contact Us{" "}
                            <HiArrowSmRight
                                size={16}
                                className="transition-all duration-300 group-hover:translate-x-1"
                            />
                        </Link>
                        <Link
                            href="https://sales.goabroad.com/widget/booking/zWN1KGFmuUm1C8Qd0hrh"
                            className="bg-white rounded-md text-cobalt-500 py-3 px-6 hover:bg-cobalt-500 hover:text-white transition-colors duration-300 font-semibold"
                        >
                            Book A Demo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
