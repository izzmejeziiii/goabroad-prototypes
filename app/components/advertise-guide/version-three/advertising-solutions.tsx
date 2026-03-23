"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import BasicProgram from "./advertising-solutions/basic-program";
import DisplayPlacements from "./advertising-solutions/display-placements";
import FeaturedListings from "./advertising-solutions/featured-listings";
import SearchResult from "./advertising-solutions/search-results";
import EmailMarketing from "./advertising-solutions/email-marketing";
import SocialMedia from "./advertising-solutions/social-media";
import ContentMarketing from "./advertising-solutions/content-marketing";
import TravelBrand from "./advertising-solutions/travel-brand";

const SOLUTIONS = [
    {
        title: "Basic Program Directory Visibility",
        subtitle: "Foundational Profile",
        Panel: BasicProgram,
    },
    {
        title: "Homepage & Directory High-Traffic Display Placements",
        subtitle: "Increase Click-Through",
        Panel: DisplayPlacements,
    },
    {
        title: "Featured Listings",
        subtitle: "Visibility",
        Panel: FeaturedListings,
    },
    {
        title: "Search Result Boosts",
        subtitle: "Enhanced Visibility",
        Panel: SearchResult,
    },
    {
        title: "Email Marketing Campaigns",
        subtitle: "Engagement",
        Panel: EmailMarketing,
    },
    {
        title: "Social Media Campaigns",
        subtitle: "Extended Visibility",
        Panel: SocialMedia,
    },
    {
        title: "Content Marketing Collaborations",
        subtitle: "Multi-Channel",
        Panel: ContentMarketing,
    },
    {
        title: "Travel Brand Promotions",
        subtitle: "Cross-Promotion",
        Panel: TravelBrand,
    },
] as const;

export default function AdvertisingSolution() {
    return (
        <section className="w-full h-full py-16 flex items-center justify-center flex-col">
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0">
                <h2 className="text-slate-800 mb-12 font-bold text-[28px] text-center">
                    Our Advertising Solutions
                </h2>
                <TabGroup className="flex flex-col items-start w-full border border-slate-200 rounded-2xl">
                    <div className="bg-slate-900 w-full pt-8 rounded-t-2xl">
                        <span className="text-sun-500 font-bold tracking-widest text-sm uppercase px-8">
                            Solutions Portfolio
                        </span>
                        <TabList className="flex gap-2 w-full overflow-x-auto px-8 mt-4">
                            {SOLUTIONS.map(({ subtitle, title }) => (
                                <Tab
                                    key={title}
                                    className={({ selected }) =>
                                        `rounded-t-xl px-5 py-3 w-62.5 text-left text-sm font-bold transition-all duration-200 outline-none flex flex-col cursor-pointer ${
                                            selected
                                                ? "bg-linear-to-b border-amber-400/30 border border-b-0 from-amber-400/20 to-amber-600/10 text-white"
                                                : "text-white/55 hover:bg-white/5 hover:text-white/70 border border-transparent"
                                        }`
                                    }
                                >
                                    <span className="block truncate w-full">
                                        {title}
                                    </span>
                                    <div className="flex gap-2 text-[10px] items-center mt-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                                        {subtitle}
                                    </div>
                                </Tab>
                            ))}
                        </TabList>
                    </div>
                    <TabPanels className="flex-1 min-w-0">
                        {SOLUTIONS.map(({ title, Panel }) => (
                            <TabPanel
                                key={title}
                                className="rounded-xl outline-none focus:outline-none"
                            >
                                <Panel />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </section>
    );
}
