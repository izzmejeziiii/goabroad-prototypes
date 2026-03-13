import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function AmplifyBrand() {
    return (
        <section className="w-full h-full">
            <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                Advertising That Amplifies Your Brand
            </h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(381px,1fr))] lg:flex items-center w-full gap-10">
                <div className="flex flex-col gap-10 w-full items-center lg:items-start">
                    <div className="space-y-2">
                        <p className="text-slate-700">
                            In addition to listings, GoAbroad advertising helps
                            you dominate key moments in the decision-making
                            journey. We help our partners accomplish their
                            marketing goals by offering customized advertising
                            campaigns that include:
                        </p>
                        <ul className="space-y-2 text-slate-700 ml-2">
                            <li className="flex gap-2 items-start">
                                <IoIosCheckmarkCircleOutline
                                    size={20}
                                    className="shrink-0 mt-1 text-cobalt-500"
                                />
                                <p>Targeted display placements</p>
                            </li>
                            <li className="flex gap-2 items-start">
                                <IoIosCheckmarkCircleOutline
                                    size={20}
                                    className="shrink-0 mt-1 text-cobalt-500"
                                />
                                <p>
                                    Comprehensive content marketing
                                    collaborations
                                </p>
                            </li>
                            <li className="flex gap-2 items-start">
                                <IoIosCheckmarkCircleOutline
                                    size={20}
                                    className="shrink-0 mt-1 text-cobalt-500"
                                />
                                <p>
                                    Seasonal and campaign-based visibility
                                    boosts
                                </p>
                            </li>
                        </ul>
                    </div>
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
                <Image
                    src="https://images.goabroad.com/image/upload/v1771901569/images2/advertisePage/analytics.png"
                    alt=""
                    width={600}
                    height={600}
                    className="w-full lg:max-w-150 rounded-lg"
                />
            </div>
        </section>
    );
}
