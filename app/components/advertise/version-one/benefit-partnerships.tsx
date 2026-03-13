import { FaRocket, FaStar, FaUsers } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";

export default function BenefitPartnerships() {
    return (
        <div className="flex w-full flex-col items-center gap-8">
            <h3 className="text-center text-[22px] font-bold text-slate-800">
                Benefits of Partnering with GoAbroad
            </h3>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(302px,1fr))] gap-6">
                <div className="w-full rounded-md border border-gray-300 p-6 flex flex-col">
                    <div className="space-y-4 flex flex-col w-full">
                        <div className="rounded-md p-3 bg-yellow-50 w-fit">
                            <FaStar size={22} className="text-sun-500" />
                        </div>
                        <span className="text-slate-700 font-semibold">
                            Increase brand recall and reputation
                        </span>
                    </div>
                </div>
                <div className="w-full rounded-md border border-gray-300 p-6 flex flex-col">
                    <div className="space-y-4 flex flex-col w-full">
                        <div className="rounded-md p-3 bg-yellow-50 w-fit">
                            <FiTrendingUp size={22} className="text-sun-500" />
                        </div>
                        <span className="text-slate-700 font-semibold">
                            Drive qualified traffic
                        </span>
                    </div>
                </div>
                <div className="w-full rounded-md border border-gray-300 p-6 flex flex-col">
                    <div className="space-y-4 flex flex-col w-full">
                        <div className="rounded-md p-3 bg-yellow-50 w-fit">
                            <FaRocket size={22} className="text-sun-500" />
                        </div>
                        <span className="text-slate-700 font-semibold">
                            Support launches, enrollment cycles, and deadlines
                        </span>
                    </div>
                </div>
                <div className="w-full rounded-md border border-gray-300 p-6 flex flex-col">
                    <div className="space-y-4 flex flex-col w-full">
                        <div className="rounded-md p-3 bg-yellow-50 w-fit">
                            <FaUsers size={22} className="text-sun-500" />
                        </div>
                        <span className="text-slate-700 font-semibold">
                            Stay top-of-mind with a global audience
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
