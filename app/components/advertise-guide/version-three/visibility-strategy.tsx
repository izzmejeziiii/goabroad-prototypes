import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { HiArrowSmRight } from "react-icons/hi";
import {
    HiMiniArrowTrendingUp,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineEye,
} from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";

export default function VisibilityStrategy() {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center max-w-7xl py-20 md:px-8 px-6 lg:px-0">
                <div className="w-full text-center flex flex-col gap-4 items-center">
                    <h2 className="font-bold text-[28px] text-slate-800 text-center">
                        Ready to Build a Visibility Strategy?
                    </h2>
                    <p className="text-slate-700 text-lg mt-6 max-w-200 w-full">
                        Every international education organization and travel
                        brand has different goals. We tailor placement
                        recommendations based on:
                    </p>
                    <hr className="h-px w-20 bg-slate-300 border-none my-6" />
                    <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 w-full max-w-300 items-center justify-center gap-4">
                        <li className="flex gap-4 items-center border bg-slate-50 border-slate-200 text-cobalt-500 font-semibold rounded-xl text-nowrap py-4 px-5">
                            <div className="p-2.5 rounded-lg bg-primary-100/50 w-fit">
                                <HiOutlineClock
                                    size={22}
                                    className="text-cobalt-500"
                                />
                            </div>
                            <p>Enrollment cycle timing</p>
                        </li>
                        <li className="flex gap-4 items-center border bg-slate-50 border-slate-200 text-cobalt-500 font-semibold rounded-xl text-nowrap py-4 px-5">
                            <div className="p-3 rounded-lg bg-primary-100/50 w-fit">
                                <FiMapPin
                                    size={18}
                                    className="text-cobalt-500"
                                />
                            </div>
                            <p>Program destination priorities</p>
                        </li>
                        <li className="flex gap-4 items-center border bg-slate-50 border-slate-200 text-cobalt-500 font-semibold rounded-xl text-nowrap py-4 px-5">
                            <div className="p-2.5 rounded-lg bg-primary-100/50 w-fit">
                                <IoIosStats
                                    size={22}
                                    className="text-cobalt-500"
                                />
                            </div>
                            <p>Competitive landscape</p>
                        </li>
                        <li className="flex gap-4 items-center border bg-slate-50 border-slate-200 text-cobalt-500 font-semibold rounded-xl text-nowrap py-4 px-5">
                            <div className="p-2.5 rounded-lg bg-primary-100/50 w-fit">
                                <HiOutlineCurrencyDollar
                                    size={22}
                                    className="text-cobalt-500"
                                />
                            </div>
                            <p>Budget parameters</p>
                        </li>
                        <li className="flex gap-4 items-center border bg-slate-50 border-slate-200 text-cobalt-500 font-semibold rounded-xl text-nowrap py-4 px-5">
                            <div className="p-2.5 rounded-lg bg-primary-100/50 w-fit">
                                <HiOutlineEye
                                    size={22}
                                    className="text-cobalt-500"
                                />
                            </div>
                            <p>Immediate visibility goals</p>
                        </li>
                        <li className="flex gap-4 items-center border bg-slate-50 border-slate-200 text-cobalt-500 font-semibold rounded-xl text-nowrap py-4 px-5">
                            <div className="p-2.5 rounded-lg bg-primary-100/50 w-fit">
                                <HiMiniArrowTrendingUp
                                    size={22}
                                    className="text-cobalt-500"
                                />
                            </div>
                            <p>Long-term growth objectives</p>
                        </li>
                    </ul>
                    <hr className="h-px w-20 bg-slate-300 border-none my-6" />
                    <p className="text-slate-700 text-lg w-full max-w-225">
                        Let’s design a visibility strategy that strengthens your
                        authority, supports your enrollment goals, and positions
                        your brand inside{" "}
                        <strong>
                            the most trusted platform in global education
                        </strong>
                        .
                    </p>
                </div>
                <div className="flex sm:flex-row flex-col w-full sm:w-fit sm:items-center gap-4 mt-10">
                    <Link
                        href="https://www.goabroad.com/account/new"
                        className="rounded-md text-white py-3 px-6 bg-roman-500 hover:bg-red-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                    >
                        Create An Account
                        <HiArrowSmRight
                            size={16}
                            className="transition-all duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                    <Link
                        href="https://www.goabroad.com/contact/advertise"
                        className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                    >
                        Contact Our Team
                    </Link>
                    <Link
                        href="https://www.goabroad.com"
                        className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                    >
                        Book A Demo
                    </Link>
                </div>
            </div>
        </section>
    );
}
