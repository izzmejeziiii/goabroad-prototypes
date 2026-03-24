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
        Panel: BasicProgram,
    },
    {
        title: "Homepage & Directory High-Traffic Display Placements",
        Panel: DisplayPlacements,
    },
    {
        title: "Featured Listings",
        Panel: FeaturedListings,
    },
    {
        title: "Search Result Boosts",
        Panel: SearchResult,
    },
    {
        title: "Email Marketing Campaigns",
        Panel: EmailMarketing,
    },
    {
        title: "Social Media Campaigns",
        Panel: SocialMedia,
    },
    {
        title: "Content Marketing Collaborations",
        Panel: ContentMarketing,
    },
    {
        title: "Travel Brand Promotions",
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
                    <div className="bg-linear-to-r from-cobalt-700 to-cobalt-300 w-full pt-8 rounded-t-2xl">
                        <TabList className="flex gap-2 w-full px-8">
                            {SOLUTIONS.map(({ title }) => (
                                <Tab
                                    key={title}
                                    className={({ selected }) =>
                                        `flex-1 min-w-0 rounded-t-xl px-3 py-3 text-[10px] text-center font-bold transition-all duration-200 outline-none flex flex-col cursor-pointer ${
                                            selected
                                                ? "bg-cobalt-200/40 border-cobalt-50 border border-b-0 text-white"
                                                : "text-white/55 hover:bg-white/5 hover:text-white/70 border border-transparent"
                                        }`
                                    }
                                >
                                    <span className="block truncate w-full">
                                        {title}
                                    </span>
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
