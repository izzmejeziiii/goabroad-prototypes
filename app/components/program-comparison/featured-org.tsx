import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

interface FeaturedOrgProps {
    featuredOrganization: {
        url: string;
        image: string;
        imageAlt: string;
        callToActionText: string;
        providerName: string;
    };
}

export default function FeaturedOrg({ featuredOrganization }: FeaturedOrgProps) {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-0">
            <div className="relative grid w-full max-w-7xl grid-cols-1 border border-slate-200 bg-slate-50 md:grid-cols-2 lg:h-[350px] lg:rounded-md">
                <Image
                    src={featuredOrganization.image}
                    width={1000}
                    height={350}
                    priority
                    alt={featuredOrganization.imageAlt}
                    className="h-full min-h-[250px] w-full rounded-l-md object-cover"
                />
                <h2 className="bg-sun-500 absolute left-4 top-4 rounded-md px-5 py-1.5 text-xs font-bold text-white lg:text-sm">
                    Featured Provider of the Month
                </h2>
                <div className="relative flex h-full w-full flex-col justify-center gap-10 p-4 lg:p-8">
                    <div className="group flex flex-col">
                        <Link
                            href={featuredOrganization.url}
                            target="_blank"
                            rel="sponsored noopener"
                            className="text-cobalt-500 group-hover:text-cobalt-600 max-w-[400px] text-2xl font-bold transition-all duration-300 hover:translate-y-[-2px]"
                            title={`with ${featuredOrganization.providerName}`}
                        >
                            {featuredOrganization.callToActionText}
                        </Link>
                        <p className="mt-2 text-base">
                            with {featuredOrganization.providerName}
                        </p>
                    </div>
                    <Link
                        href={featuredOrganization.url}
                        target="_blank"
                        rel="sponsored noopener"
                        className="bg-cobalt-500 focus:bg-cobalt-600 focus:ring-primary-200 hover:bg-cobalt-600 group flex items-center justify-center gap-1.5 self-start rounded-md px-12 py-2.5 text-white hover:cursor-pointer focus:outline-none focus:ring-4"
                    >
                        <span className="text-sm font-bold">Visit Website</span>
                        <FiExternalLink className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-focus:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
