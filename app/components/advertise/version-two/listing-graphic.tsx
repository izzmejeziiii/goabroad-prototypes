import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

export default function ListingGraphic() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-10">
            <h3 className="text-center text-[22px] font-bold text-slate-800">
                3 Easy Steps to Get Listed on GoAbroad
            </h3>
            <Image
                src="https://res.cloudinary.com/gacom/image/upload/v1771813896/images2/advertisePage/advertise.png"
                alt=""
                width={1000}
                height={800}
                className="w-full max-w-250"
            />
            <Link
                href="https://www.goabroad.com/acccount/new"
                className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
            >
                Get Started
                <HiArrowSmRight
                    size={16}
                    className="transition-all duration-300 group-hover:translate-x-1"
                />
            </Link>
        </div>
    );
}
