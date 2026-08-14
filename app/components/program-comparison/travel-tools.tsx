import Link from "next/link";
import { FaMoneyCheckAlt, FaPassport } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { BsHousesFill } from "react-icons/bs";

const GA_URL = "https://www.goabroad.com";

const tools = [
    {
        icon: <FaMoneyCheckAlt className="text-2xl text-white" />,
        text: "Funding & Scholarships",
        link: `${GA_URL}/scholarships-abroad`,
    },
    {
        icon: <AiFillSafetyCertificate className="text-2xl text-white" />,
        text: "Travel Insurance",
        link: `${GA_URL}/mygoabroad/insurance`,
    },
    {
        icon: <BsHousesFill className="text-2xl text-white" />,
        text: "Accommodations",
        link: `${GA_URL}/travel-resources/accommodations-abroad`,
    },
    {
        icon: <FaPassport className="text-2xl text-white" />,
        text: "Passports & Visas",
        link: `${GA_URL}/travel-resources/passports-visas`,
    },
    {
        icon: <MdOutlinePhonelinkRing className="text-2xl text-white" />,
        text: "Mobile Data Plans",
        link: `${GA_URL}/travel-resources/mobile-data-abroad`,
    },
    {
        icon: (
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-2xl text-white"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    d="M12,3 L21,7.5 L12,12 L3,7.5 L12,3 Z M16.5,10.25 L21,12.5 L12,17 L3,12.5 L7.5,10.25 L7.5,10.25 M16.5,15.25 L21,17.5 L12,22 L3,17.5 L7.5,15.25 L7.5,15.25"
                ></path>
            </svg>
        ),
        text: "Other Resources",
        link: `${GA_URL}/travel-resources`,
    },
];

export default function TravelTools() {
    return (
        <div id="travel-tools" className="flex flex-col gap-4 px-4 lg:px-0">
            <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between lg:items-center">
                <div>
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        Travel Tools
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
                {tools.map((tool, index) => (
                    <Link
                        key={`tool-${index}`}
                        href={tool.link}
                        className="hover:bg-cobalt-600 group flex items-center gap-2 rounded-md border bg-slate-100 p-3"
                    >
                        <div className="bg-cobalt-600 group-hover:bg-cobalt-500 rounded-full p-2 md:p-3">
                            {tool.icon}
                        </div>
                        <span className="xxs:text-[10px] xs:text-xs font-bold text-slate-700 group-hover:text-white">
                            {tool.text}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
