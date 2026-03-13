import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

export default function GrowWithGoAbroad() {
    return (
        <section className="w-full bg-linear-to-r flex flex-col justify-between from-blue-900 h-full sm:max-h-117.5 to-cobalt-500 rounded-lg p-8 text-white">
            <div className="space-y-4">
                <h2 className="font-bold text-[28px]">
                    Grow Your Business with GoAbroad
                </h2>
                <p className="w-full max-w-3xl">
                    With over 1 million visitors a month, GoAbroad is the
                    premier platform for connecting with students and
                    professionals interested in international opportunities. Our
                    advertising solutions are designed to help you reach your
                    target audience and achieve your marketing goals.
                </p>
            </div>
            <div className="flex sm:flex-row flex-col w-full sm:items-center gap-4 mt-10">
                <Link
                    href="https://www.goabroad.com/account/new"
                    className="rounded-md text-cobalt-500 py-3 px-6 bg-white hover:bg-roman-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Create An Account
                    <HiArrowSmRight
                        size={16}
                        className="transition-all duration-300 group-hover:translate-x-1"
                    />
                </Link>
                <Link
                    href="https://www.goabroad.com/contact/advertise"
                    className="rounded-md text-white border border-white py-3 px-6 bg-transparent hover:bg-white transition-colors duration-300 font-semibold text-sm hover:text-cobalt-500 group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Contact Our Team
                </Link>
                <Link
                    href="https://www.goabroad.com"
                    className="rounded-md text-white py-3 border border-white px-6 bg-transparent hover:bg-white transition-colors duration-300 font-semibold text-sm hover:text-cobalt-500 group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Book A Demo
                </Link>
            </div>
        </section>
    );
}
