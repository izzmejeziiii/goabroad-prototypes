import Image from "next/image";
import Link from "next/link";

interface TravelResourceAdProps {
    travelResourceAd: {
        url: string;
        image: string;
        imageAlt: string;
        providerLogo: string;
        providerName: string;
        callToActionText: string;
    };
}

export default function TravelResourceAd({
    travelResourceAd,
}: TravelResourceAdProps) {
    return (
        <div className="mt-12 overflow-hidden rounded-md px-4 lg:px-0">
            <Link
                target="_blank"
                rel="noopener nofollow sponsored"
                href={travelResourceAd.url}
                className="group relative flex h-[255px] w-full flex-col items-start justify-center gap-4 rounded-md p-6 lg:p-8"
            >
                <div className="z-sky absolute inset-0 h-full w-full rounded-md bg-linear-to-t from-slate-900/50 transition-all duration-300 group-hover:from-slate-900"></div>

                <Image
                    className="z-ground absolute inset-0 h-full w-full rounded-md object-cover transition-all duration-300 group-hover:scale-110"
                    src={travelResourceAd.image}
                    width={300}
                    height={500}
                    alt={travelResourceAd.imageAlt}
                />
                <Image
                    className="z-sky h-[100px] w-[100px] rounded-md bg-white p-2"
                    src={travelResourceAd.providerLogo}
                    width={100}
                    height={100}
                    alt={`${travelResourceAd.providerName} Logo`}
                />
                <p className="z-sky relative text-lg font-bold text-white">
                    {travelResourceAd.callToActionText}
                </p>
            </Link>
        </div>
    );
}
