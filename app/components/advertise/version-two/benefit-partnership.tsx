import { FaBullhorn, FaChartLine, FaGlobe, FaRocket } from "react-icons/fa6";

export default function BenefitPartnership() {
    return (
        <section className="w-full h-full">
            <div className="w-full h-full rounded-xl bg-linear-to-r from-primary-50 to-cobalt-50/40 p-6 md:p-8 lg:p-10">
                <h2 className="text-slate-800 font-bold text-[28px] text-center mb-10">
                    Benefits of Partnering with GoAbroad
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(282px,1fr))] w-full gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-primary-50 rounded-full p-6 w-fit">
                            <FaBullhorn size={20} className="text-cobalt-500" />
                        </div>
                        <p className="font-semibold text-slate-700">
                            Increase brand recall and reputation
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-primary-50 rounded-full p-6 w-fit">
                            <FaChartLine
                                size={20}
                                className="text-cobalt-500"
                            />
                        </div>
                        <p className="font-semibold text-slate-700">
                            Drive qualified traffic
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-primary-50 rounded-full p-6 w-fit">
                            <FaRocket size={20} className="text-cobalt-500" />
                        </div>
                        <p className="font-semibold text-slate-700">
                            Support launches, enrollment cycles, and deadlines
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-primary-50 rounded-full p-6 w-fit">
                            <FaGlobe size={20} className="text-cobalt-500" />
                        </div>
                        <p className="font-semibold text-slate-700">
                            Stay top-of-mind with a global audience
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
