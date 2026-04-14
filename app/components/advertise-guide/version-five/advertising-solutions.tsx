"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import BasicProgram from "../version-four/advertising-solutions/basic-program";
import DisplayPlacements from "../version-four/advertising-solutions/display-placements";
import FeaturedListings from "../version-four/advertising-solutions/featured-listings";
import SearchResult from "../version-four/advertising-solutions/search-results";
import EmailMarketing from "../version-four/advertising-solutions/email-marketing";
import SocialMedia from "../version-four/advertising-solutions/social-media";
import ContentMarketing from "../version-four/advertising-solutions/content-marketing";
import TravelBrand from "../version-four/advertising-solutions/travel-brand";

const SOLUTIONS = [
    {
        title: "Basic Profile",
        Panel: BasicProgram,
    },
    {
        title: "Display Placements",
        Panel: DisplayPlacements,
    },
    {
        title: "Featured Listings",
        Panel: FeaturedListings,
    },
    {
        title: "Result Boosts",
        Panel: SearchResult,
    },
    {
        title: "Email Marketing",
        Panel: EmailMarketing,
    },
    {
        title: "Social Campaigns",
        Panel: SocialMedia,
    },
    {
        title: "Content Collaborations",
        Panel: ContentMarketing,
    },
    {
        title: "Brand Promotions",
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
                        <TabList className="flex justify-around w-full px-8 overflow-x-auto no-scrollbar">
                            {SOLUTIONS.map(({ title }) => (
                                <Tab
                                    key={title}
                                    className={({ selected }) =>
                                        `w-fit rounded-t-xl px-3 py-3 text-sm text-center font-bold transition-all duration-200 outline-none flex flex-col cursor-pointer ${
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
