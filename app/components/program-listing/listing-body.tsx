"use client";

import { HeroSection } from "./sections/hero-section";
import { Description } from "./sections/description";
import { ProgramHighlights } from "./sections/program-highlights";
import { MediaGallery } from "./sections/media-gallery";
import { QuickDetails } from "./sections/quick-details";
import { Awards } from "./sections/awards";
import { ProgramReviews } from "./sections/program-reviews";
import { ProgramDetails } from "./sections/program-details";
import { FAQ } from "./sections/faq";
import { Interviews } from "./sections/interviews";
import { ProviderBottomCTA } from "./sections/provider-bottom-cta";
import { RelatedPrograms } from "./sections/related-programs";

export function ListingBody() {
    return (
        <>
            <HeroSection />
            <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-6 mt-8 px-4 lg:px-0">
                <div className="w-full flex flex-col gap-10">
                    <Description />
                    <ProgramHighlights />
                    <MediaGallery />
                </div>
                <div className="shrink-0 w-full lg:w-[400px] flex flex-col gap-10">
                    <QuickDetails />
                    <Awards />
                </div>
            </div>
            <div className="w-full flex flex-col items-center mt-10 gap-10 max-w-[1200px] px-4 lg:px-0">
                <ProgramReviews />
                <ProgramDetails />
            </div>
            <div className="w-full bg-slate-50 mt-10">
                <FAQ />
            </div>
            <div className="w-full flex flex-col items-center mt-10 gap-10 max-w-[1200px] px-4 lg:px-0">
                <Interviews />
                <ProviderBottomCTA />
                <RelatedPrograms />
            </div>
        </>
    );
}
