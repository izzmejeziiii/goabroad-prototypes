import Image from "next/image";

export default function TestimonialCard() {
    return (
        <div className="border border-gray-200 h-82.5 shrink-0 w-102.5 lg:w-full lg:h-full group lg:hover:shadow-cobalt-50/10 rounded-md shadow-md transition-all duration-300 lg:hover:shadow-xl lg:hover:-translate-y-2 p-6 flex flex-col gap-4">
            <div className="rounded-full py-2 px-4 bg-yellow-50 text-sun-500 w-fit font-semibold text-sm">
                GlobalEd
            </div>
            <p className="text-slate-700 line-clamp-5 py-4 italic">
                &quot;GoAbroad has been an invaluable partner for us. Their
                platform has significantly increased our visibility and helped
                us connect with a global audience of students and professionals
                interested in international opportunities.&quot;
            </p>
            <div className="flex gap-2 w-full items-center">
                <div className="border-4 border-cobalt-50/40 rounded-full w-15 h-15 overflow-hidden">
                    <Image
                        src="https://images.goabroad.com/image/upload/v1739765214/images2/advertisePage/jonathan-gilben.webp"
                        alt=""
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-slate-800 font-semibold">
                        Jane Doe
                    </span>
                    <span className="text-slate-500 text-sm">
                        Director of Marketing
                    </span>
                </div>
            </div>
        </div>
    );
}
