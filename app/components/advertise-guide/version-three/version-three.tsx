"use client";
import Testimonial from "../../reusable/testimonials/testimonials";
import GoabroadAdvertising from "../version-two/goabroad-advertising";
import AdvertisingSolution from "./advertising-solutions";
import FeaturedPartners from "./featured-partners";
import GoabroadPartner from "./goabroad-partner";
import GoabroadVisibility from "./goabroad-visibility";
import HeroSection from "./hero-section";
import VisibilityStrategy from "./visibility-strategy";

export default function VersionThree() {
    return (
        <main className="w-full h-full flex flex-col items-center justify-center">
            <HeroSection />
            <GoabroadVisibility />
            <AdvertisingSolution />
            <GoabroadAdvertising />
            <GoabroadPartner />
            {/* <GoabroadVisibility />
            <AdvertisingSolution />
            <GoabroadAdvertising />
            <GoabroadPartner /> */}
            <div className="w-full max-w-7xl mt-14 px-4 md:px-6 lg:px-8 xl:px-0">
                <Testimonial />
            </div>
            {/* <FeaturedPartners /> */}
            <FeaturedPartners />
            <VisibilityStrategy />
            {/* <FeaturedPartners />
            <VisibilityStrategy /> */}
        </main>
    );
}
