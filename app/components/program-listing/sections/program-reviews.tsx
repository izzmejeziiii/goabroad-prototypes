import { HiStar, HiOutlineChat } from "react-icons/hi";
import { program } from "../data";

export const ProgramReviews = () => (
    <div className="w-full h-full font-inter flex flex-col items-center gap-4">
        <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1">
                <h2 className="font-bold text-2xl">
                    Program Reviews{" "}
                    <span className="text-xs font-normal italic">
                        (Program reviews will appear here on your listing)
                    </span>
                </h2>
                <p className="text-sm">
                    Hear what past participants have to say about the program
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <div className="bg-gray-200 rounded-md w-[191px] h-[40px]"></div>
                <div className="bg-gray-200 rounded-md w-[144px] h-[40px]"></div>
            </div>
        </div>
        <div className="w-full border border-slate-200 rounded-md flex justify-between p-4">
            <div className="flex gap-8 w-fit shrink-0">
                <div className="flex flex-col w-fit shrink-0">
                    <h3 className="font-bold text-2xl">Overall Rating</h3>
                    <div className="flex gap-1 items-center">
                        <span className="text-xl font-bold">
                            {program.rating}
                        </span>
                        <HiStar className="h-5 w-5 text-amber-500" />
                    </div>
                </div>
                <div className="flex flex-col w-fit shrink-0">
                    <h3 className="font-bold text-2xl">Total Reviews</h3>
                    <div className="flex gap-1 items-center">
                        <span className="text-xl font-bold">
                            {program.reviews_count}
                        </span>
                        <HiOutlineChat className="h-5 w-5" />
                    </div>
                </div>
            </div>
            <div className="relative w-full justify-end flex">
                <button className="px-4 py-2 bg-roman-500 text-white rounded-md font-bold text-sm">
                    Review this Program
                </button>
            </div>
        </div>
        {[1, 2].map((i) => (
            <div
                key={i}
                className="w-full rounded-md border border-slate-200 p-4 flex flex-col gap-2"
            >
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-lg">
                            An incredible experience that changed my life
                        </div>
                        <small className="text-sm flex items-center gap-2">
                            by: <span className="font-bold">Sarah Johnson</span>
                        </small>
                        <div className="text-sm font-bold flex gap-2">
                            Program:{" "}
                            <span className="font-normal">
                                Volunteer Abroad in Costa Rica
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <HiStar
                                key={s}
                                className="h-5 w-5 text-amber-500"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex gap-6 w-full">
                    <div className="w-full flex flex-col gap-4">
                        <p className="text-sm text-slate-700">
                            Volunteering with IVHQ was the most rewarding
                            experience of my life. The local team was incredibly
                            supportive, and the project was meaningful and
                            impactful. I made friends from around the world and
                            grew tremendously as a person. I would highly
                            recommend this program to anyone considering
                            volunteering abroad.
                        </p>
                    </div>
                    <div className="max-w-[200px] w-full shrink-0">
                        <div className="grid gap-2 grid-cols-2">
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded-md"></div>
                            <div className="w-[80px] h-[80px] bg-gray-200 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
