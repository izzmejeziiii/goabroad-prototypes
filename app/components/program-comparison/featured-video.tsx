import Link from "next/link";
import { IoMdOpen } from "react-icons/io";

/**
 * Video of the Month. Production mounts react-player; the prototype embeds the
 * same YouTube video directly so the layout and framing match.
 */
interface FeaturedVideoProps {
    featuredVideo: {
        url: string;
        callToActionText: string;
        providerName: string;
        embedUrl: string;
    };
}

export default function FeaturedDirectoryVideoAd({
    featuredVideo,
}: FeaturedVideoProps) {
    return (
        <div className="relative flex w-full flex-col items-center gap-4 overflow-hidden rounded-md bg-slate-100 p-4 py-8 lg:flex-row lg:p-8">
            <h2 className="bg-sun-500 absolute left-0 top-0 px-5 py-1.5 text-xs font-bold text-white lg:text-base">
                Video of the Month
            </h2>
            <div className="lg:order-0 z-ground order-1 flex h-full w-full flex-col justify-center gap-10">
                <div>
                    <p className="max-w-[400px] text-2xl font-bold">
                        <Link
                            href={featuredVideo.url}
                            rel="noopener sponsored"
                            target="_blank"
                            className="block w-fit"
                        >
                            {featuredVideo.callToActionText}
                        </Link>
                    </p>
                    <Link
                        href={featuredVideo.url}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="video-title"
                    >
                        <p className="mt-2 text-base">{featuredVideo.providerName}</p>
                    </Link>
                </div>
                <Link
                    href={featuredVideo.url}
                    rel="noopener sponsored"
                    target="_blank"
                    className="bg-cobalt-500 hover:bg-cobalt-600 focus:ring-primary-200 group flex h-10 w-40 items-center justify-center rounded-md px-5 text-sm font-bold text-white focus:outline-none focus:ring-4 lg:flex"
                >
                    Visit Website
                    <IoMdOpen className="ml-2 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
            <div className="order-0 mt-4 h-[300px] w-full shrink-0 overflow-hidden rounded-md lg:order-1 lg:mt-0 lg:w-[550px] lg:p-0">
                <iframe
                    frameBorder={0}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    title={featuredVideo.callToActionText}
                    width="100%"
                    height="100%"
                    src={featuredVideo.embedUrl}
                    id="widget12"
                />
            </div>
        </div>
    );
}
