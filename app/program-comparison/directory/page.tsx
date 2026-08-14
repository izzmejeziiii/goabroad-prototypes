"use client";

import { useState } from "react";
import HeroSection from "../../components/program-comparison/hero-section";
import StickySecondaryNav from "../../components/program-comparison/sticky-secondary-nav";
import GuideIntro from "../../components/program-comparison/guide-intro";
import CarouselBox from "../../components/program-comparison/carousel-box";
import FeaturedOrg from "../../components/program-comparison/featured-org";
import FeaturedProgramAds from "../../components/program-comparison/featured-programs";
import FeaturedDirectoryVideoAd from "../../components/program-comparison/featured-video";
import GuideSectionContent from "../../components/program-comparison/guide-section";
import PremierSponsorship from "../../components/program-comparison/premier-sponsorship";
import Faqs from "../../components/program-comparison/faqs";
import Reviews from "../../components/program-comparison/reviews";
import InterviewSection from "../../components/program-comparison/interviews";
import TravelTools from "../../components/program-comparison/travel-tools";
import TravelResourceAd from "../../components/program-comparison/travel-resource-ad";
import PopularSearches from "../../components/program-comparison/popular-searches";
import RecentArticles from "../../components/program-comparison/recent-articles";
import OAIBanner from "../../components/program-comparison/oai-banner";
import {
    faqs,
    featuredOrganization,
    featuredVideo,
    guideIntro,
    guideSections,
    guideTitle,
    headlineAds,
    interviews,
    popularSearches,
    premierFeature,
    premierSponsorship,
    programReviews,
    programReviewsCount,
    recentArticles,
    travelResourceAd,
} from "../../components/program-comparison/data";

const activeSections = [
    "search",
    "programs",
    "guides",
    "faqs",
    "reviews",
    "interviews",
];

/**
 * Study abroad directory, rebuilt as a prototype. Section order, markup, and
 * content mirror https://www.goabroad.com/study-abroad — this is the base the
 * program comparison work builds on.
 */
export default function ProgramComparisonDirectoryPage() {
    const [isOpenReadMore, setIsOpenReadMore] = useState(false);

    const handleClickReadMore = () => {
        const guides = document.getElementById("guides");
        const scrollDiv = guides
            ? guides.getBoundingClientRect().top + window.scrollY
            : 0;
        window.scrollTo({ top: scrollDiv - 80, behavior: "smooth" });
    };

    return (
        <div className="directory-root w-full">
            <main className="flex w-full flex-col items-center gap-20 pb-20 text-neutral-800">
                <div className="flex w-full flex-col items-center">
                    <HeroSection />
                    <StickySecondaryNav activeSections={activeSections} />
                </div>
                <div className="flex w-full max-w-7xl flex-col gap-20">
                    <GuideIntro
                        intro={guideIntro}
                        onReadMore={() => {
                            handleClickReadMore();
                            setIsOpenReadMore(true);
                        }}
                    />
                    <CarouselBox
                        h2="Top Study Abroad Providers"
                        ads={headlineAds}
                        isPrio
                    />
                    <FeaturedOrg featuredOrganization={featuredOrganization} />
                    <CarouselBox
                        h2="Featured Study Abroad Opportunities"
                        ads={premierFeature}
                    />
                    <FeaturedProgramAds />
                    <FeaturedDirectoryVideoAd featuredVideo={featuredVideo} />
                    <div>
                        <GuideSectionContent
                            guideTitle={guideTitle}
                            guideSections={guideSections}
                            isOpenReadMore={isOpenReadMore}
                            onToggleReadMore={handleClickReadMore}
                        />
                    </div>
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <PremierSponsorship listings={premierSponsorship} isWithFaqs />
                        <Faqs faqs={faqs} />
                    </div>
                    <div>
                        <Reviews
                            programReviews={programReviews}
                            programReviewsCount={programReviewsCount}
                            viewAllUrl="https://www.goabroad.com/reviews?directory_id=6"
                        />
                    </div>
                    <div className="gap-7.5 flex w-full max-w-7xl">
                        <div className="flex w-full flex-col gap-12">
                            <InterviewSection
                                interviews={interviews}
                                viewAllUrl="https://www.goabroad.com/interviews?directory_id=6"
                            />
                        </div>
                    </div>
                    <div className="flex grid-cols-2 flex-col gap-4 md:grid">
                        <TravelTools />
                        <TravelResourceAd travelResourceAd={travelResourceAd} />
                    </div>
                    <PopularSearches groups={popularSearches} />
                    <RecentArticles recentArticles={recentArticles} />
                </div>
            </main>
            <OAIBanner />
        </div>
    );
}
