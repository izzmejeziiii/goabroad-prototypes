import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const dealsGraphic =
    "https://images.goabroad.com/image/upload/v1/images2/homepage/cta_hands.webp";

export default function DealsCTA({ sideBySide }: { sideBySide?: boolean }) {
    return (
        <div className="w-full">
            <div
                className={clsx("mx-auto h-full w-full rounded-lg bg-slate-100", {
                    "md:max-w-7xl": !sideBySide,
                    "md:max-w-[1200px]": sideBySide,
                })}
            >
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-slate-100 p-4 md:flex-row md:items-center md:px-8 md:py-6 xl:items-start">
                    <div className="z-ground flex h-full flex-col items-start space-y-4 md:w-3/5 md:justify-between lg:w-full lg:flex-row lg:items-center lg:space-y-0">
                        <div
                            className={clsx(
                                "g:justify-between flex h-full w-full flex-col gap-3 sm:max-w-[85%] md:gap-4",
                                { "lg:max-w-[55%]": !!sideBySide },
                            )}
                        >
                            <div className="h-fit space-y-3">
                                <h2 className="w-full text-lg font-bold leading-tight sm:text-xl md:text-2xl">
                                    Apply for Scholarships &amp; Deals
                                </h2>
                                <p className="m-0 h-fit max-w-[90%] text-xs text-neutral-800 sm:max-w-full sm:text-sm md:text-base">
                                    Submit a single application on{" "}
                                    <span className="font-bold">MyGoAbroad</span> to get
                                    exclusive discounts on{" "}
                                    <span className="font-bold">travel programs</span>!
                                </p>
                            </div>
                            <Link
                                href="https://www.goabroad.com/mygoabroad/offers/apply"
                                className="bg-secondary-500 inline-flex w-fit items-center rounded-md border border-transparent px-4 py-2 text-center text-sm font-semibold text-white no-underline shadow-sm transition-shadow hover:bg-red-500 hover:text-white focus:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200 md:py-2.5"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                    <Image
                        src={dealsGraphic}
                        className="pointer-events-none absolute bottom-0 right-[-20px] origin-bottom-right scale-[55%] opacity-70 sm:right-0 md:scale-[100%] lg:origin-right"
                        alt="Three hands holding a passport and visa"
                        width={289}
                        height={198}
                    />
                </div>
            </div>
        </div>
    );
}
