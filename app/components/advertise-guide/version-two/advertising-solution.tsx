"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import BasicProgram from "./advertising-solutions/basic.program";
import DisplayPlacements from "./advertising-solutions/display-placements";
import FeaturedListings from "./advertising-solutions/featured-listings";
import SearchResult from "./advertising-solutions/search-results";
import EmailMarketing from "./advertising-solutions/email-marketing";
import SocialMedia from "./advertising-solutions/social-media";
import ContentMarketing from "./advertising-solutions/content-marketing";
import TravelBrand from "./advertising-solutions/travel-brand";

const SOLUTIONS = [
    {
        tier: "Tier 1",
        title: "Basic Program Directory Visibility",
        Panel: BasicProgram,
    },
    {
        tier: "Tier 2",
        title: "Homepage & Directory High-Traffic Display Placements",
        Panel: DisplayPlacements,
    },
    { tier: "Tier 3", title: "Featured Listings", Panel: FeaturedListings },
    { tier: "Tier 4", title: "Search Result Boosts", Panel: SearchResult },
    {
        tier: "Tier 5",
        title: "Email Marketing Campaigns",
        Panel: EmailMarketing,
    },
    { tier: "Tier 6", title: "Social Media Campaigns", Panel: SocialMedia },
    {
        tier: "Tier 7",
        title: "Content Marketing Collaborations",
        Panel: ContentMarketing,
    },
    { tier: "Tier 8", title: "Travel Brand Promotions", Panel: TravelBrand },
] as const;

export default function AdvertisingSolution() {
    return (
        <section className="w-full h-full py-16 flex items-center justify-center flex-col">
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0">
                <h2 className="text-slate-800 mb-12 font-bold text-[28px] text-center">
                    Our Advertising Solutions
                </h2>
                <TabGroup className="flex gap-6 lg:flex-row flex-col items-start">
                    <TabList className="flex flex-row lg:flex-col gap-2 w-full overflow-x-auto lg:w-[320px] shrink-0">
                        {SOLUTIONS.map(({ tier, title }) => (
                            <Tab
                                key={tier}
                                className={({ selected }) =>
                                    `rounded-xl px-5 py-3 w-full text-left text-sm font-bold transition-all duration-200 outline-none flex flex-col ${
                                        selected
                                            ? "bg-cobalt-500 text-white shadow-md"
                                            : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span className="block truncate">
                                            {title}
                                        </span>
                                        <span
                                            className={`block uppercase text-xs mt-0.5 font-semibold ${
                                                selected
                                                    ? "text-slate-200"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {tier}
                                        </span>
                                    </>
                                )}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="flex-1 min-w-0">
                        {SOLUTIONS.map(({ tier, Panel }) => (
                            <TabPanel
                                key={tier}
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
