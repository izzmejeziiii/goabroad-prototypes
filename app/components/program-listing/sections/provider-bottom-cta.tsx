"use client";

import { IoMdStar } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useVersion } from "../version-context";
import { program } from "../data";

export const ProviderBottomCTA = () => {
    const { active } = useVersion();
    return (
    <div className="font-inter flex w-full flex-col rounded-md bg-slate-900 p-8">
        <div className="flex w-full max-w-7xl items-center justify-between gap-8">
            <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-3xl font-bold text-white">
                    Ready to Learn More?
                </h3>
                <p className="line-clamp-3 text-white max-w-[75%]">
                    {active.data.description}
                </p>
            </div>
            <div className="flex min-w-[30%] flex-col gap-8 rounded-md bg-slate-50 p-4">
                <div className="flex items-start gap-4">
                    <div className="h-[50px] w-[50px] shrink-0 rounded-md bg-white p-1">
                        <img
                            className="h-full w-full rounded-md object-contain"
                            src={program.logo}
                            alt={program.provider_name}
                        />
                    </div>
                    <div className="text-neutral-700">
                        <p className="text-lg font-bold">
                            {program.provider_name}
                        </p>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-sm font-bold">
                                <IoMdStar className="text-sun-500 text-lg" />
                                {program.rating}
                            </span>
                            {program.verified && (
                                <span className="flex items-center gap-1 text-sm font-bold">
                                    <FaCheckCircle className="text-fern-500 text-sm" />
                                    Verified
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <button className="bg-roman-500 w-full min-w-48 rounded-md px-4 py-4 text-center text-sm font-bold text-white hover:bg-red-500">
                    Visit Website
                </button>
            </div>
        </div>
    </div>
    );
};
