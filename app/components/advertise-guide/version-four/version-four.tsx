"use client";

import Testimonial from "../../reusable/testimonials/testimonials";
import FeaturedPartners from "../version-three/featured-partners";
import GoabroadPartner from "../version-three/goabroad-partner";
import GoabroadVisibility from "../version-three/goabroad-visibility";
import VisibilityStrategy from "../version-three/visibility-strategy";
import GoabroadAdvertising from "../version-two/goabroad-advertising";
import AdvertisingSolution from "./advertising-solutions";
import HeroSection from "./hero-section";

export default function VersionFour() {
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
