import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

export default function GrowGoAbroad() {
    return (
        <section className="w-full h-full lg:h-125 bg-linear-to-r from-primary-50 to-cobalt-50/40 rounded-xl py-12 md:px-8 px-6 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full flex flex-col items-center gap-4 text-center">
                <h2 className="font-bold text-[36px] text-slate-800">
                    Ready to Grow with GoAbroad?
                </h2>
                <p className="text-slate-700 text-lg">
                    Let&apos;s turn listings and advertising into lasting assets
                    that boost brand authority, organic visibility, and lead
                    generation across search, content, and AI platforms for you.
                </p>
            </div>
            <div className="flex sm:flex-row flex-col w-full sm:w-fit sm:items-center gap-4 mt-10">
                <Link
                    href="https://www.goabroad.com/account/new"
                    className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-roman-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Create An Account
                    <HiArrowSmRight
                        size={16}
                        className="transition-all duration-300 group-hover:translate-x-1"
                    />
                </Link>
                <Link
                    href="https://www.goabroad.com/contact/advertise"
                    className="rounded-md text-cobalt-500 py-3 px-6 bg-white hover:bg-cobalt-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Contact Our Team
                </Link>
                <Link
                    href="https://www.goabroad.com"
                    className="rounded-md text-cobalt-500 py-3 px-6 bg-white hover:bg-cobalt-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Book A Demo
                </Link>
            </div>
        </section>
    );
}
