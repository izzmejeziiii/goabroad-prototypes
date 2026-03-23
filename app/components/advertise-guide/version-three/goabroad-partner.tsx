import Link from "next/link";
import { FaRegCompass } from "react-icons/fa6";
import { HiArrowSmRight } from "react-icons/hi";
import {
    LuBookOpen,
    LuBriefcaseBusiness,
    LuGraduationCap,
    LuLanguages,
} from "react-icons/lu";
import {
    RiBuilding2Line,
    RiMapPin2Line,
    RiSuitcaseLine,
    RiUserVoiceLine,
} from "react-icons/ri";

export default function GoabroadPartner() {
    return (
        <section className="w-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 xl:px-0">
            <div className="w-full max-w-7xl flex flex-col items-center">
                <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                    Who Should Partner with GoAbroad?
                </h2>
                <div className="space-y-6 w-full">
                    <p className="text-slate-800 text-center">
                        Our advertising solutions are designed for:
                    </p>
                    <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <LuGraduationCap size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Study abroad and high school program
                                    providers
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <LuBriefcaseBusiness size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Internship and volunteer organizations
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <LuLanguages size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Language schools
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <LuBookOpen size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    TEFL certification programs
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <FaRegCompass size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Gap year providers
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <RiBuilding2Line size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Universities and international education
                                    institutions
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <RiMapPin2Line size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Adventure tour operators
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <RiSuitcaseLine size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Work abroad program providers
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border p-4 border-gray-300 hover:shadow-md transition-shadow duration-250">
                            <div className="w-full flex gap-3 items-center">
                                <div className="bg-primary-100/70 text-cobalt-500 rounded-full p-3">
                                    <RiUserVoiceLine size={22} />
                                </div>
                                <p className="text-slate-700 text-sm">
                                    Teach abroad programs and teacher placement
                                    companies
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-800">
                        If your organization is seeking sustainable enrollment
                        growth, stronger authority signals, and greater
                        visibility across search and AI environments, GoAbroad
                        provides a{" "}
                        <strong>
                            context-driven platform to support that expansion
                        </strong>
                        .
                    </p>
                </div>
                <Link
                    href="https://www.goabroad.com/account/new"
                    className="rounded-md text-white py-3 px-6 mt-10 bg-cobalt-500 hover:bg-roman-500 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center sm:w-max"
                >
                    Create An Account
                    <HiArrowSmRight
                        size={16}
                        className="transition-all duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    );
}
