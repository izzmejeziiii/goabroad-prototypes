import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import Breadcrumbs from "../../reusable/breadcrumbs";

export default function HeroSection() {
    return (
        <section className="w-full h-screen lg:h-[70vh] bg-linear-to-b from-primary-50 to-white flex flex-col items-center relative justify-center">
            <Breadcrumbs
                isAbsolute
                link="advertise-guide"
                page="Advertise Guide"
            />
            <div className="flex flex-col items-center justify-center absolute inset-0 w-full h-full px-4">
                <div className="text-slate-800 max-w-4xl text-center flex flex-col gap-12 items-center justify-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-[42px] font-bold text-cobalt-500">
                            GoAbroad Advertising Guide
                        </h1>
                        <h2 className="font-semibold text-2xl">
                            Strategic Placements That Drive Enrollment,
                            Authority & AI Visibility
                        </h2>
                        <div className="space-y-1 text-slate-700">
                            <p>
                                Advertising on GoAbroad is not about impressions
                                alone. It is about positioning your organization
                                inside moments of intent. Whether your goal is
                                to increase applications, strengthen destination
                                dominance, or accelerate brand recognition,
                                GoAbroad placements are built to work within a
                                trusted global education ecosystem. Discover how
                                our advertising placements work, where they
                                appear, and how they support enrollment growth,
                                brand authority, search visibility, and AI
                                discoverability.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
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
