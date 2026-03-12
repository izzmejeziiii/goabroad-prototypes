"use client";

import { useState } from "react";
import Image from "next/image";
import {
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaLinkedin,
    FaSquareThreads,
} from "react-icons/fa6";
import { FaFacebookSquare, FaPinterestSquare } from "react-icons/fa";
import Link from "next/link";
import FooterLinkGroup, { FooterLinkGroupProp } from "./footer-link-group";

const footerLinks: FooterLinkGroupProp[] = [
    {
        title: "Explore By Program Type",
        links: [
            {
                label: "Study Abroad",
                href: `/study-abroad`,
            },
            {
                label: "Volunteer Abroad",
                href: `/volunteer-abroad`,
            },
            {
                label: "Intern Abroad",
                href: `/intern-abroad`,
            },
            {
                label: "Teach Abroad",
                href: `/teach-abroad`,
            },
            {
                label: "TEFL Courses",
                href: `/tefl-courses`,
            },
            {
                label: "Gap Year",
                href: `/gap-year`,
            },
            {
                label: "Degrees Abroad",
                href: `/degrees-abroad`,
            },
            {
                label: "High School Abroad",
                href: `/high-school-abroad`,
            },
            {
                label: "Language Schools",
                href: `/language-schools`,
            },
            {
                label: "Adventure Travel",
                href: `/adventure-travel`,
            },
            {
                label: "Jobs Abroad",
                href: `/jobs-abroad`,
            },
        ],
    },
    {
        title: "Tools for Travelers",
        links: [
            {
                label: "MyGoAbroad",
                href: `/mygoabroad`,
            },
            {
                label: "Get a Travel eSIM",
                href: `/mygoabroad/esim`,
            },
            {
                label: "Get Travel Insurance",
                href: `/mygoabroad/insurance`,
            },
            {
                label: "Apply for Deals",
                href: `/mygoabroad/offers/apply`,
            },
            {
                label: "Help Me Pick a Program",
                href: `/onlineadvisor`,
            },
            {
                label: "How It Works",
                href: `/how-it-works`,
            },
            {
                label: "Travel Articles",
                href: `/articles`,
            },
            {
                label: "Travel Resources",
                href: `/travel-resources`,
            },
            {
                label: "Scholarships",
                href: `/scholarships-abroad`,
            },
            {
                label: "Travel Fundraising",
                href: "https://www.fundmytravel.com/",
                rel: "noopener",
                target: "_blank",
            },
            {
                label: "Program Reviews",
                href: `/reviews`,
            },
            {
                label: "Alumni & Staff Interviews",
                href: `/interviews`,
            },
        ],
    },
    {
        title: "Travel Resources",
        links: [
            {
                label: "AI Program Finder",
                href: `/program-finder`,
            },
            {
                label: "Book Flights",
                href: `/travel-resources/flights-transportation`,
            },
            {
                label: "Accommodations",
                href: `/travel-resources/accommodations-abroad`,
            },
            {
                label: "Travel Insurance",
                href: "/insurance",
            },
            {
                label: "Passport & Visas",
                href: `/travel-resources/passports-visas`,
            },
            {
                label: "Embassy Information",
                href: "/embassy",
            },
            {
                label: "Travel Credit Cards & Financing",
                href: `/travel-resources/finances-abroad`,
            },
            {
                label: "Mobile Data & SIM Cards",
                href: `/travel-resources/mobile-data-abroad`,
            },
            {
                label: "Programs for Spanish Speakers",
                href: "https://www.travolucion.com/?utm_source=goabroad&utm_medium=footer",
                rel: "noopener",
                target: "_blank",
            },
        ],
    },
    {
        title: "Partnerships",
        links: [
            {
                label: "Advertise With Us",
                href: `/advertise`,
            },
            {
                label: "Create An Account",
                href: `/account/new`,
            },
            {
                label: "Client Account Login",
                href: "/admin",
            },
            {
                label: "Who We Work With",
                href: `/providers`,
            },
            {
                label: "Program Verification",
                href: `/verification`,
            },
            {
                label: "Market in Spanish",
                href: "https://www.travolucion.com/?utm_source=goabroad&utm_medium=footer",
                rel: "follow noopener",
                target: "_blank",
            },
            {
                label: "Contact Our Team",
                href: `/contact/advertise`,
            },
        ],
    },
    {
        title: "Who We Are",
        links: [
            {
                label: "About",
                href: `/about`,
            },
            {
                label: "Meet Our Team",
                href: `/about#our-team`,
            },
            {
                label: "Careers",
                href: `/careers`,
            },
            {
                label: "Corporate Blog",
                href: "/blog",
                rel: "noopener",
                target: "_blank",
            },
            {
                label: "Innovation Awards",
                href: `/innovation-awards`,
                rel: "noopener",
                target: "_blank",
            },
            {
                label: "GoAbroad Foundation",
                href: "http://www.goabroad.org/",
                rel: "noopener",
                target: "_blank",
            },
            {
                label: "Contact Us",
                href: `/contact`,
            },
        ],
    },
];

const Footer: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        localStorage.setItem("newsletter_email", email);
        window.location.href = `/newsletter`;
    };
    return (
        <footer className="border-t border-gray-200 bg-neutral-50 md:border-t-2">
            <div className="py-8 mx-auto max-w-7xl space-y-8 px-4 lg:space-y-12 xl:px-4 2xl:px-0">
                <div className="space-y-3 md:hidden">
                    <h3 className="text-left text-sm font-bold text-neutral-800 lg:text-left">
                        Subscribe to our newsletter
                    </h3>
                    <div className="flex space-x-3">
                        <div className="flex w-full space-x-3">
                            <div className="relative min-w-0 flex-1 rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="EMAIL"
                                    type="email"
                                    className="block w-full rounded-md border border-solid border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition-shadow placeholder:font-light placeholder:text-gray-500 focus:border-none focus:outline focus:outline-blue-500 focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                className="bg-roman-500 px-4 flex shrink justify-center rounded-md border border-transparent py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
                                onClick={handleSubmit}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="space-y-8 md:mt-4 lg:space-y-12">
                    <div className="gap-4 flex flex-col lg:grid lg:grid-cols-5">
                        {footerLinks.map((linkGroup, index) => (
                            <FooterLinkGroup
                                {...linkGroup}
                                key={`footerlinkgroup-${index}`}
                            />
                        ))}
                    </div>
                    <div className="flex w-full flex-col gap-4 md:items-center">
                        <div className="hidden w-full max-w-137.5 space-y-4 md:block">
                            <h3 className="text-center text-sm font-bold text-neutral-800">
                                Subscribe to our newsletter
                            </h3>
                            <div className="flex">
                                <form
                                    action="https://www.goabroad.com/newsletter"
                                    method="POST"
                                    target="_blank"
                                    rel="noopener"
                                    className="flex w-full space-x-3"
                                >
                                    <div className="relative min-w-0 flex-1 rounded-md shadow-sm">
                                        <input
                                            id="email"
                                            name="EMAIL"
                                            type="email"
                                            className="block w-full rounded-md border border-solid border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-shadow placeholder:font-light placeholder:text-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100"
                                            placeholder="Email Address"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        className="bg-roman-500 px-4 flex shrink justify-center rounded-md border border-transparent py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-col items-start space-y-3 md:items-center">
                            <h4 className="text-center text-sm font-bold text-neutral-800">
                                Connect with us
                            </h4>
                            <div className="flex space-x-4">
                                <Link
                                    className="fb gtm-no-link-social-fb"
                                    title="Facebook"
                                    href="https://www.facebook.com/GoAbroadCom"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaFacebookSquare className="h-6 w-6 text-gray-600" />
                                </Link>
                                <Link
                                    className="threads gtm-no-link-social-threads"
                                    title="Threads"
                                    href="https://www.threads.net/@goabroadcom"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaSquareThreads className="h-6 w-6 text-gray-600" />
                                </Link>
                                <Link
                                    className="instagram gtm-no-link-social-instagram"
                                    title="Instagram"
                                    href="https://instagram.com/goabroadcom/"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaInstagram className="h-6 w-6 text-gray-600" />
                                </Link>
                                <Link
                                    className="youtube gtm-no-link-social-youtube"
                                    title="Youtube"
                                    href="https://www.youtube.com/user/GoAbroadCom"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaYoutube className="h-6 w-6 text-gray-600" />
                                </Link>
                                <Link
                                    className="pinterest gtm-no-link-social-pinterest"
                                    title="Pinterest"
                                    href="https://pinterest.com/goabroadcom/"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaPinterestSquare className="h-6 w-6 text-gray-600" />
                                </Link>
                                <Link
                                    className="linkedin gtm-no-link-social-linkedin"
                                    title="LinkedIn"
                                    href="https://www.linkedin.com/company/goabroad/"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaLinkedin className="h-6 w-6 text-gray-600" />
                                </Link>
                                <Link
                                    className="tiktok gtm-no-link-social-tiktok"
                                    title="Tiktok"
                                    href="https://www.tiktok.com/@goabroadcom"
                                    target="_blank"
                                    rel="nofollow noopener"
                                >
                                    <FaTiktok className="h-5 w-5 text-gray-600" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="flex flex-col justify-between md:flex-row md:items-end">
                    <nav className="mt-3 flex w-69 space-x-6">
                        <Link
                            href={`/privacy`}
                            className="block text-xs font-normal text-neutral-700 hover:underline"
                        >
                            Terms of Use & Privacy
                        </Link>
                        <Link
                            href={`/legal`}
                            className="block text-xs font-normal text-neutral-700 hover:underline"
                        >
                            Legal
                        </Link>
                        <Link
                            href={`/sitemap`}
                            className="block text-xs font-normal text-neutral-700 hover:underline"
                        >
                            Sitemap
                        </Link>
                    </nav>
                    <div className="ml-sm mt-6 hidden w-69 flex-col items-center space-y-6 lg:flex">
                        <Image
                            src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                            alt="GoAbroad"
                            height={56}
                            width={73}
                        />
                        <Image
                            src="https://res.cloudinary.com/gacom/image/upload/v1701404251/images2/tagline.png"
                            alt="Meaningful Travel Starts Here"
                            width={276}
                            height={32}
                            className="relative mb-8 opacity-30"
                        />
                    </div>
                    <p className="md:ml-sm mt-6 w-69 text-xs text-neutral-700 md:text-right">
                        © Copyright 1998 - {new Date().getFullYear()}{" "}
                        GoAbroad.com ®
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
