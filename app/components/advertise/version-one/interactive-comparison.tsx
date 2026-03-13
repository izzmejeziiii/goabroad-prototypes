import Image from "next/image";
import Link from "next/link";
import Macbook from "../macbook";

const checkIcon =
    "https://images.goabroad.com/image/upload/v1724381761/images2/advertisePage/check-icon.png";
const crossIcon =
    "https://images.goabroad.com/image/upload/v1724381761/images2/advertisePage/x-icon.png";

export default function InteractiveComparison() {
    const navLink = [
        {
            num: "1",
            linkText: "Provider Summary",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
            defaultClass: "feature-selected",
        },

        {
            num: "2",
            linkText: "Logo",
            firstIcon: crossIcon,
            secondIcon: checkIcon,
        },

        {
            num: "3",
            linkText: "Verification Badge",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
        },

        {
            num: "4",
            linkText: "Social Media Profile Links",
            firstIcon: crossIcon,
            secondIcon: checkIcon,
        },

        {
            num: "5",
            linkText: "Participant Reviews",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
        },

        {
            num: "6",
            linkText: "Staff & Alumni Interviews",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
        },

        {
            num: "7",
            linkText: "Frequently Asked Questions",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
        },

        {
            num: "8",
            linkText: "Contributed Articles",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
        },

        {
            num: "9",
            linkText: "Affiliations & Awards",
            firstIcon: checkIcon,
            secondIcon: checkIcon,
        },

        {
            num: "10",
            linkText: "Media Gallery",
            firstIcon: crossIcon,
            secondIcon: checkIcon,
        },

        {
            num: "11",
            linkText: "Eligible for Online Advisor Matching",
            firstIcon: crossIcon,
            secondIcon: checkIcon,
        },

        {
            num: "12",
            linkText: "Direct link to your website",
            firstIcon: crossIcon,
            secondIcon: checkIcon,
        },

        {
            num: "13",
            linkText: "Custom Inquiry Form Link",
            firstIcon: crossIcon,
            secondIcon: checkIcon,
        },
    ];

    const adScroll = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();

        const targetSelf = event.currentTarget as HTMLElement;
        const screenImage = document.querySelector<HTMLElement>(".image");
        const btnNum = targetSelf.querySelector("span")?.innerHTML || "";
        const marker = document.querySelector<HTMLElement>(".marker-wrap");
        const markerSpan = document.querySelector<HTMLElement>(".marker");

        // Remove selected state
        const elements =
            document.querySelectorAll<HTMLElement>(".screen-nav a");
        elements.forEach((element) => {
            element.classList.remove("feature-selected");
        });

        switch (btnNum) {
            case "1":
                screenImage!.style.transform = "translateY(0)";
                marker!.style.transform = "translate(-50%, 270px)";
                markerSpan!.innerHTML = "1";
                targetSelf.classList.add("feature-selected");
                break;

            case "2":
                screenImage!.style.transform = "translateY(0)";
                marker!.style.transform = "translate(calc(-50% - 280px), 170px)";
                markerSpan!.innerHTML = "2";
                targetSelf.classList.add("feature-selected");
                break;

            case "3":
                screenImage!.style.transform = "translateY(0)";
                marker!.style.transform = "translate(calc(-50% - 195px), 165px)";
                markerSpan!.innerHTML = "3";
                targetSelf.classList.add("feature-selected");
                break;

            case "4":
                screenImage!.style.transform = "translateY(-100px)";
                marker!.style.transform = "translate(calc(-50% + 210px), 220px)";
                markerSpan!.innerHTML = "4";
                targetSelf.classList.add("feature-selected");
                break;

            case "5":
                screenImage!.style.transform = "translateY(-350px)";
                marker!.style.transform = "translate(calc(-50% - 45px), 80px)";
                markerSpan!.innerHTML = "5";
                targetSelf.classList.add("feature-selected");
                break;

            case "6":
                screenImage!.style.transform = "translateY(-1520px)";
                marker!.style.transform = "translate(calc(-50% - 100px), 70px)";
                markerSpan!.innerHTML = "6";
                targetSelf.classList.add("feature-selected");
                break;

            case "7":
                screenImage!.style.transform = "translateY(-1260px)";
                marker!.style.transform = "translate(calc(-50% + 270px), 80px)";
                markerSpan!.innerHTML = "7";
                targetSelf.classList.add("feature-selected");
                break;

            case "8":
                screenImage!.style.transform = "translateY(-1920px)";
                marker!.style.transform = "translate(calc(-50% - 100px), 100px)";
                markerSpan!.innerHTML = "8";
                targetSelf.classList.add("feature-selected");
                break;

            case "9":
                screenImage!.style.transform = "translateY(-2020px)";
                marker!.style.transform = "translate(-50%, 170px)";
                markerSpan!.innerHTML = "9";
                targetSelf.classList.add("feature-selected");
                break;

            case "10":
                screenImage!.style.transform = "translateY(-1260px)";
                marker!.style.transform = "translate(calc(-50% - 120px), 80px)";
                markerSpan!.innerHTML = "10";
                targetSelf.classList.add("feature-selected");
                break;

            case "11":
                screenImage!.style.transform = "translateY(0)";
                marker!.style.transform = "translate(calc(-50% + 185px), 25px)";
                markerSpan!.innerHTML = "11";
                targetSelf.classList.add("feature-selected");
                break;

            case "12":
                screenImage!.style.transform = "translateY(0)";
                marker!.style.transform = "translate(calc(-50% - 280px), 210px)";
                markerSpan!.innerHTML = "12";
                targetSelf.classList.add("feature-selected");
                break;

            case "13":
                screenImage!.style.transform = "translateY(0)";
                marker!.style.transform = "translate(calc(-50% - 115px), 210px)";
                markerSpan!.innerHTML = "13";
                targetSelf.classList.add("feature-selected");
                break;
        }
    };

    const renderNavLinks = () => {
        return navLink.map((navLink, index) => {
            const { num, linkText, firstIcon, secondIcon, defaultClass } =
                navLink;

            return (
                <Link
                    aria-label="feature links"
                    className={`${defaultClass} group mb-1 flex justify-between py-1 px-2`}
                    onClick={adScroll}
                    href="#"
                    key={index}
                >
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="group-hover:bg-cobalt-500/60 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border-[3px] border-gray-300 pt-px text-xs text-gray-300 group-hover:border-none">
                            {num}
                        </span>
                        <p className="hover: text-sm text-slate-700">
                            {linkText}
                        </p>
                    </div>
                    <div className="my-auto flex w-31.25 shrink-0 justify-between">
                        <Image
                            src={firstIcon}
                            alt=""
                            aria-hidden="false"
                            width={20}
                            height={18}
                            className="ml-2 h-4.5 w-5 shrink-0 xl:ml-0"
                        />
                        <Image
                            src={secondIcon}
                            alt=""
                            aria-hidden="false"
                            width={20}
                            height={18}
                            className="ml-2 mr-6 h-4.5 w-5 shrink-0 xl:ml-0"
                        />
                    </div>
                </Link>
            );
        });
    };

    return (
        <div className="flex w-full flex-col items-center">
            <div
                id="started"
                className="flex w-full flex-col items-center gap-2"
            >
                <h3 className="text-center text-[22px] font-bold text-slate-800">
                    GoAbroad Profile & Program Listing Features
                </h3>
                <div className="flex w-full flex-wrap items-center gap-4 xl:flex-nowrap">
                    <div className="hidden w-full md:flex md:flex-col md:items-center xl:-ml-4">
                        <div className="relative flex h-150 w-213.5 items-center justify-center">
                            <Macbook />
                            <div className="absolute top-21.5 flex h-103.25 w-170 justify-center overflow-hidden">
                                <Image
                                    src="https://images.goabroad.com/image/upload/v1770089006/images2/advertisePage/provider-landing-page.webp"
                                    alt=""
                                    aria-hidden="true"
                                    className="image absolute max-w-170 transition-transform duration-500 ease-out"
                                    width={680}
                                    height={2273}
                                />
                                <div
                                    className="marker-wrap absolute left-1/2 top-0 w-10 transition-transform duration-500 ease-out"
                                    style={{ transform: "translate(-50%, 270px)" }}
                                >
                                    <span className="marker animate-pulsate bg-sun-500 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white font-bold text-white">
                                        1
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="screen-nav w-full">
                        <div className="relative mb-4 flex justify-between font-bold uppercase">
                            <span>Features</span>
                            <div className="space-x-4">
                                <span>Basic</span> <span>Premium</span>
                            </div>
                        </div>
                        {renderNavLinks()}
                    </div>
                </div>
            </div>
        </div>
    );
}
