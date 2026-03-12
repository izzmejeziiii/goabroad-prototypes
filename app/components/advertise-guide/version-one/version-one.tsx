"use client";

import Testimonial from "../../reusable/testimonials/testimonials";
import AdvertisingSolution from "./advertising-solution";
import FeaturedPartners from "./featured-partners";
import GoabroadAdvertising from "./goabroad-advertising";
import GoabroadPartner from "./goabroad-partners";
import GoabroadVisibility from "./goabroad-visibility";
import HeroSection from "./hero-section";
import VisibilityStrategy from "./visibility-strategy";

export default function VersionOne() {
    return (
        <main className="w-full h-full flex flex-col items-center justify-center">
            <HeroSection />
            <GoabroadVisibility />
            <AdvertisingSolution />
            <GoabroadAdvertising />
            <GoabroadPartner />
            <div className="w-full max-w-7xl mt-14 px-4 md:px-6 lg:px-8 xl:px-0">
                <Testimonial />
            </div>
            <FeaturedPartners />
            <VisibilityStrategy />
        </main>
    );
}
