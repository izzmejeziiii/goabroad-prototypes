import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { PiXBold } from "react-icons/pi";

interface TestimonialCardProps {
    testimony: string;
    name: string;
    role: string;
    organization: string;
    image: string;
}

export default function TestimonialCard({
    testimony,
    name,
    role,
    organization,
    image,
}: TestimonialCardProps) {
    const [isReadMore, setIsReadMore] = useState(false);

    return (
        <>
            <div className="border border-gray-200 h-82.5 shrink-0 w-102.5 lg:w-full lg:h-full group lg:hover:shadow-cobalt-50/10 rounded-md shadow-md transition-all duration-300 lg:hover:shadow-xl lg:hover:-translate-y-2 p-6 flex flex-col gap-4">
                <div className="w-full flex items-center gap-1">
                    <FaStar size={18} className="text-sun-500" />
                    <FaStar size={18} className="text-sun-500" />
                    <FaStar size={18} className="text-sun-500" />
                    <FaStar size={18} className="text-sun-500" />
                    <FaStar size={18} className="text-sun-500" />
                </div>
                <div className="w-full min-h-fit overflow-hidden py-4 flex flex-col">
                    <p className="text-slate-700 line-clamp-5 italic">
                        &quot;{testimony}&quot;
                    </p>
                    <button
                        onClick={() => setIsReadMore(true)}
                        className="hover:underline text-cobalt-500 font-bold w-fit mr-auto mt-1"
                    >
                        Read More
                    </button>
                </div>
                <div className="flex gap-2 w-full items-center">
                    <div className="border-4 border-cobalt-50/40 shrink-0 rounded-full w-15 h-15 overflow-hidden">
                        <Image
                            src={image}
                            alt=""
                            width={60}
                            height={60}
                            className="w-full h-full object-cover shrink-0"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-slate-800 font-semibold">
                            {name}
                        </span>
                        <span className="text-slate-500 text-sm">
                            {role} | {organization}
                        </span>
                    </div>
                </div>
            </div>

            <Dialog
                open={isReadMore}
                onClose={() => {}}
                className="relative z-50 focus:outline-none"
            >
                <div className="fixed inset-0 bg-black/50" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="data-closed:transform-[scale(95%)] h-auto w-150 rounded-lg bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-closed:opacity-0">
                            <div className="relative flex w-full flex-col gap-10">
                                <button
                                    onClick={() => setIsReadMore(false)}
                                    className="absolute right-0 top-0"
                                >
                                    <PiXBold className="h-5 w-5" />
                                </button>
                                <div className="flex w-full flex-col items-center gap-8">
                                    <div className="space-y-4 w-full">
                                        <div className="flex gap-3 w-full items-center">
                                            <div className="h-17.5 w-17.5 overflow-hidden border-5 border-cobalt-50/40 shrink-0 rounded-full">
                                                <Image
                                                    src={image}
                                                    alt={name}
                                                    aria-label={`${name}'s profile image`}
                                                    width={70}
                                                    height={70}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-800 font-semibold">
                                                    {name}
                                                </span>
                                                <span className="text-slate-500 text-sm">
                                                    {role} | {organization}
                                                </span>
                                            </div>
                                        </div>
                                        <hr className="border-none h-px bg-gray-200 w-full" />
                                    </div>
                                    <div className="h-full max-h-62.5 overflow-y-auto lg:max-h-full">
                                        <p className="text-slate-700">
                                            {testimony}
                                        </p>
                                    </div>
                                    <div className="w-full flex items-center gap-1">
                                        <FaStar
                                            size={18}
                                            className="text-sun-500"
                                        />
                                        <FaStar
                                            size={18}
                                            className="text-sun-500"
                                        />
                                        <FaStar
                                            size={18}
                                            className="text-sun-500"
                                        />
                                        <FaStar
                                            size={18}
                                            className="text-sun-500"
                                        />
                                        <FaStar
                                            size={18}
                                            className="text-sun-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
