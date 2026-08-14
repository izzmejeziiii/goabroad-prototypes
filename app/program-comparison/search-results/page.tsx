"use client";

import { useState } from "react";
import SearchResultsHero from "../../components/program-comparison/sr-hero-section";
import StickySecondaryNav from "../../components/program-comparison/sticky-secondary-nav";
import GuideIntro from "../../components/program-comparison/guide-intro";
import DesktopAdvancedFilters, {
    useFilterSelection,
} from "../../components/program-comparison/advanced-filters";
import CompareSidePanel from "../../components/program-comparison/compare/compare-side-panel";
import CarouselBox from "../../components/program-comparison/carousel-box";
import FeaturedOrg from "../../components/program-comparison/featured-org";
import Programs from "../../components/program-comparison/programs";
import FeaturedDirectoryVideoAd from "../../components/program-comparison/featured-video";
import GuideSectionContent from "../../components/program-comparison/guide-section";
import PremierSponsorship from "../../components/program-comparison/premier-sponsorship";
import Faqs from "../../components/program-comparison/faqs";
import Reviews from "../../components/program-comparison/reviews";
import InterviewSection from "../../components/program-comparison/interviews";
import PopularSearches from "../../components/program-comparison/popular-searches";
import DealsCTA from "../../components/program-comparison/deals-cta";
import TravelTools from "../../components/program-comparison/travel-tools";
import TravelResourceAd from "../../components/program-comparison/travel-resource-ad";
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
    pageMeta,
    popularSearches,
    premierSponsorship,
    programReviews,
    programReviewsCount,
    recentArticles,
    travelResourceAd,
} from "../../components/program-comparison/search-results-data";

// Search results order the nav differently from the directory: programs and
// FAQs come before the guide.
const activeSections = [
    "search",
    "programs",
    "faqs",
    "reviews",
    "guides",
    "interviews",
];

const REVIEWS_URL =
    "https://www.goabroad.com/reviews?directory_id=6&country_id=46";
const INTERVIEWS_URL =
    "https://www.goabroad.com/interviews?directory_id=6&country_id=46";

/**
 * Study abroad search results for Japan, rebuilt as a prototype — a copy of
 * https://www.goabroad.com/study-abroad/search/japan/study-abroad-1.
 */
export default function ProgramComparisonSearchResultsPage() {
    const [isOpenReadMore, setIsOpenReadMore] = useState(false);
    const filterState = useFilterSelection();

    const handleClickReadMore = () => {
        setTimeout(() => {
            const guides = document.getElementById("guides");
            const scrollDiv = guides
                ? guides.getBoundingClientRect().top + window.scrollY
                : 0;
            window.scrollTo({ top: scrollDiv - 80, behavior: "smooth" });
        }, 0);
    };

    const scrollToPrograms = () => {
        const programs = document.getElementById("programs");
        if (!programs) return;
        const top = programs.getBoundingClientRect().top + window.scrollY - 170;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <div className="directory-root w-full">
            <main className="flex w-full flex-col items-center gap-20 pb-20 text-neutral-800">
                <div className="flex w-full flex-col items-center">
                    <SearchResultsHero filterState={filterState} />
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
                    <div className="gap-7.5 flex w-full justify-center">
                        <DesktopAdvancedFilters
                            state={filterState}
                            onApply={scrollToPrograms}
                            footer={<CompareSidePanel />}
                        />
                        <div className="max-w-250 flex min-w-0 flex-1 flex-col gap-20">
                            <div className="flex flex-col gap-6 lg:gap-12">
                                <CarouselBox h2={pageMeta.h2} ads={headlineAds} isPrio />
                                <FeaturedOrg
                                    featuredOrganization={featuredOrganization}
                                />
                                <Programs />
                            </div>
                            <div>
                                <FeaturedDirectoryVideoAd
                                    featuredVideo={featuredVideo}
                                />
                            </div>
                            <div>
                                <GuideSectionContent
                                    guideTitle={guideTitle}
                                    guideSections={guideSections}
                                    isOpenReadMore={isOpenReadMore}
                                    onToggleReadMore={handleClickReadMore}
                                />
                            </div>
                            <div className="flex flex-col gap-8 lg:flex-row">
                                <PremierSponsorship
                                    listings={premierSponsorship}
                                    isWithFaqs
                                />
                                <Faqs faqs={faqs} />
                            </div>
                            <div>
                                <Reviews
                                    programReviews={programReviews}
                                    programReviewsCount={programReviewsCount}
                                    viewAllUrl={REVIEWS_URL}
                                />
                            </div>
                            <div className="gap-7.5 flex w-full max-w-7xl">
                                <div className="flex w-full flex-col gap-12">
                                    <InterviewSection
                                        interviews={interviews}
                                        viewAllUrl={INTERVIEWS_URL}
                                    />
                                </div>
                            </div>
                            <div>
                                <PopularSearches groups={popularSearches} />
                            </div>
                            <div className="grid w-full max-w-7xl grid-cols-1 gap-20 px-4 xl:px-0">
                                <DealsCTA />
                            </div>
                            <div className="flex grid-cols-2 flex-col gap-4 md:grid">
                                <TravelTools />
                                <TravelResourceAd travelResourceAd={travelResourceAd} />
                            </div>
                            <div>
                                <RecentArticles recentArticles={recentArticles} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <OAIBanner />
        </div>
    );
}
