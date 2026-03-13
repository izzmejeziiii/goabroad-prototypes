import React, { ReactNode } from "react";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { style } from "typestyle";
import Image from "next/image";

type Bullet = {
    before?: string;
    strong: string;
    after?: string;
};

type Card = {
    title: string;
    description: (string | React.JSX.Element)[];
    bullets: Bullet[];
    linkHref: string;
    linkLabel: string;
    linkTarget?: string;
    footer?: string;
    image: string;
};

const customStyle = style({
    $nest: {
        ".slick-list": {
            height: "fit-content !important",
        },

        ".custom-dot": {
            width: 100,
            display: "flex",
            justifyContent: "space-between",
        },

        ".styled-dot": {
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0 !important",
        },

        ".styled-dot li": {
            width: 12,
            height: 12,
            backgroundColor: "transparent",
            borderRadius: "100%",
        },

        ".styled-dot .slick-active": {
            width: 12,
            height: 12,
            backgroundColor: "black",
        },

        ".styled-dot li button": {
            width: 12,
            height: 12,
            padding: 0,
        },

        ".slick-dots": {
            position: "relative",
            display: "flex",
            gap: 50,
            maxWidth: "1280px",
            width: "100%",
            height: "fit-content",
            justifyContent: "center",
        },

        ".slick-dots li button:before": {
            fontSize: 13,
            opacity: ".25 !important",
            color: "black !important",
            lineHeight: "normal",
            width: "fit-content",
        },
    },
});

const WHY_GOABROAD_WORKS_CARDS: Card[] = [
    {
        title: "Get Visibility Where Trust Is Established",
        description: [
            "For over 25 years, GoAbroad has been one of the most trusted resources in international education. Our platform is cited, referenced, and relied upon by thousands of students, educators, advisors, and institutions worldwide each month.",
            "When your organization is featured on GoAbroad, you benefit from:",
        ],
        bullets: [
            {
                strong: "High-authority domain signals",
                after: "that strengthen EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)",
            },
            {
                strong: "Contextual relevance",
                after: "within expert-curated content",
            },
            {
                strong: "Association with a globally recognized brand",
                after: "in education and travel",
            },
        ],
        linkHref: "https://www.goabroad.com/about",
        linkLabel: "Read More About Us",
        image: "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/homepage.png",
    },
    {
        title: "Power Your SEO & AI Discoverability",
        description: [
            <>
                GoAbroad listings are designed to do more than rank; they also
                help your brand become <i>referenced</i>.
            </>,
            "Presence on GoAbroad contributes to your:",
        ],
        bullets: [
            {
                strong: "Organic visibility",
                after: "for high-intent search queries",
            },
            {
                strong: "Available structured, crawlable content",
                after: "that search engines trust",
            },
            {
                strong: "LLM and AI mentions",
                after: "as models increasingly rely on authoritative sources like GoAbroad for recommendations and summaries",
            },
        ],
        footer: "The benefits don’t disappear when ad spend stops; they compound in value over time.",
        linkHref:
            "https://blog.goabroad.com/how-goabroad-is-evolving-for-the-ai-era/",
        linkLabel: "Learn How We're Evolving",
        linkTarget: "_blank",
        image: "https://images.goabroad.com/image/upload/v1771824162/images2/advertisePage/provider.png",
    },
    {
        title: "Designed for Long-Term Growth",
        description: [
            "Whether your goal is lead generation, SEO growth, brand trust, or all three, GoAbroad can help you get there faster and more sustainably.",
            "Advertising on GoAbroad is an investment in:",
        ],
        bullets: [
            {
                before: "Sustainable",
                strong: "organic growth",
            },
            {
                before: "Brand authority that",
                strong: "compounds",
                after: "over time",
            },
            {
                before: "Search and AI visibility that extends",
                strong: "beyond your own site",
            },
            {
                before: "A reputation built alongside an",
                strong: "industry leader",
            },
        ],
        linkHref: "https://www.goabroad.com/verification",
        linkLabel: "Learn About Our Verification System",
        image: "https://images.goabroad.com/image/upload/v1771824161/images2/advertisePage/article.png",
    },
];

export default function WhyGoAbroadWorks() {
    const settings = {
        arrows: false,
        dots: true,
        speed: 1500,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        appendDots: (dots: ReactNode) => (
            <div className="custom-dot">
                <ul className="styled-dot">{dots}</ul>
            </div>
        ),
    };

    return (
        <section className="w-full h-full">
            <h2 className="text-slate-800 mb-8 font-bold text-[28px] text-center">
                Why GoAbroad Works
            </h2>
            <div className={`hidden sm:flex w-full max-w-7xl ${customStyle}`}>
                <Slider {...settings} className="w-full">
                    {WHY_GOABROAD_WORKS_CARDS.map((card) => (
                        <div
                            key={card.title}
                            className="grid! grid-cols-[repeat(auto-fill,minmax(381px,1fr))] lg:flex! items-center w-full gap-10"
                        >
                            <div className="flex flex-col gap-10 order-2 lg:order-1">
                                <div className="space-y-4">
                                    <h3 className="text-slate-800 font-bold text-[22px]">
                                        {card.title}
                                    </h3>
                                    <div className="space-y-2">
                                        {card.description.map(
                                            (paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="text-slate-700"
                                                >
                                                    {paragraph}
                                                </p>
                                            ),
                                        )}
                                        <ul className="space-y-2 text-slate-700 ml-2">
                                            {card.bullets.map(
                                                (bullet, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex gap-2 items-start"
                                                    >
                                                        <IoIosCheckmarkCircleOutline
                                                            size={20}
                                                            className="shrink-0 mt-1 text-cobalt-500"
                                                        />
                                                        <p>
                                                            {bullet.before && (
                                                                <>
                                                                    {
                                                                        bullet.before
                                                                    }{" "}
                                                                </>
                                                            )}
                                                            <strong>
                                                                {bullet.strong}
                                                            </strong>
                                                            {bullet.after && (
                                                                <>
                                                                    {" "}
                                                                    {
                                                                        bullet.after
                                                                    }
                                                                </>
                                                            )}
                                                        </p>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                        {"footer" in card && card.footer && (
                                            <p className="text-slate-700">
                                                {card.footer}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Link
                                    href={card.linkHref}
                                    target={card.linkTarget}
                                    className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center"
                                >
                                    {card.linkLabel}
                                    <HiArrowSmRight
                                        size={16}
                                        className="transition-all duration-300 group-hover:translate-x-1"
                                    />
                                </Link>
                            </div>
                            <Image
                                src={card.image}
                                alt=""
                                width={700}
                                height={337}
                                className="rounded-lg lg:max-w-175 w-full order-1 lg:order-2"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="flex flex-col w-full gap-16 sm:hidden">
                {WHY_GOABROAD_WORKS_CARDS.map((card) => (
                    <div
                        key={card.title}
                        className="flex flex-col items-center w-full gap-10"
                    >
                        <div className="flex flex-col gap-10 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h3 className="text-slate-800 font-bold text-[22px]">
                                    {card.title}
                                </h3>
                                <div className="space-y-2">
                                    {card.description.map(
                                        (paragraph, index) => (
                                            <p
                                                key={index}
                                                className="text-slate-700"
                                            >
                                                {paragraph}
                                            </p>
                                        ),
                                    )}
                                    <ul className="space-y-2 text-slate-700 ml-2">
                                        {card.bullets.map((bullet, index) => (
                                            <li
                                                key={index}
                                                className="flex gap-2 items-start"
                                            >
                                                <IoIosCheckmarkCircleOutline
                                                    size={20}
                                                    className="shrink-0 mt-1 text-cobalt-500"
                                                />
                                                <p>
                                                    {bullet.before && (
                                                        <>{bullet.before} </>
                                                    )}
                                                    <strong>
                                                        {bullet.strong}
                                                    </strong>
                                                    {bullet.after && (
                                                        <> {bullet.after}</>
                                                    )}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                    {"footer" in card && card.footer && (
                                        <p className="text-slate-700">
                                            {card.footer}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Link
                                href={card.linkHref}
                                target={card.linkTarget}
                                className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-full justify-center"
                            >
                                {card.linkLabel}
                                <HiArrowSmRight
                                    size={16}
                                    className="transition-all duration-300 group-hover:translate-x-1"
                                />
                            </Link>
                        </div>
                        <Image
                            src={card.image}
                            alt=""
                            width={700}
                            height={337}
                            className="rounded-lg lg:max-w-175 w-full order-1 lg:order-2"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
