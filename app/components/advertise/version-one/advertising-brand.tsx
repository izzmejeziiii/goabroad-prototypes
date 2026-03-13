import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import BenefitPartnerships from "./benefit-partnerships";

export default function AdvertisingBrand() {
    return (
        <section className="w-full flex flex-col items-center gap-10">
            <div className="space-y-8 w-full flex flex-col items-center">
                <div className="space-y-8 mb-4">
                    <h2 className="text-slate-800 font-bold text-[28px] text-center">
                        Advertising That Amplifies Your Brand
                    </h2>
                    <p className="text-slate-700">
                        In addition to listings, GoAbroad advertising helps you
                        dominate key moments in the decision-making journey. We
                        help our partners accomplish their marketing goals by
                        offering customized advertising campaigns that include:
                    </p>
                </div>
                <ul className="text-slate-700 mb-4 space-y-4 ml-4 w-full">
                    <li className="flex gap-2 items-center">
                        <IoIosCheckmarkCircleOutline
                            size={20}
                            className="text-cobalt-500"
                        />
                        Targeted display placements
                    </li>
                    <li className="flex gap-2 items-center">
                        <IoIosCheckmarkCircleOutline
                            size={20}
                            className="text-cobalt-500"
                        />
                        Comprehensive content marketing collaborations
                    </li>
                    <li className="flex gap-2 items-center">
                        <IoIosCheckmarkCircleOutline
                            size={20}
                            className="text-cobalt-500"
                        />
                        Seasonal and campaign-based visibility boosts
                    </li>
                </ul>
                <Link
                    href="https://www.goabroad.com/advertise-guide"
                    className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                >
                    Jump To Advertising Options
                    <HiArrowSmRight
                        size={16}
                        className="transition-all duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
            <BenefitPartnerships />
        </section>
    );
}
