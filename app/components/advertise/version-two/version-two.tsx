import Testimonial from "../../reusable/testimonials/testimonials";
import AmplifyBrand from "./amplify-brand";
import BenefitPartnership from "./benefit-partnership";
import GlobalAudience from "./global-audience";
import GrowGoAbroad from "./grow-goabroad";
import HeroSection from "./hero-section";
import OnlinePresence from "./online-presence";
import WhyGoAbroadWorks from "./why-goabroad-works";

export default function VersionTwo() {
    return (
        <main className="w-full flex flex-col items-center justify-center">
            <HeroSection />
            <div className="w-full max-w-7xl flex flex-col gap-16 py-12 px-4 md:px-6 lg:px-8 xl:px-0">
                <WhyGoAbroadWorks />
                <GlobalAudience />
                <OnlinePresence />
                <AmplifyBrand />
                <BenefitPartnership />
                <Testimonial />
                <GrowGoAbroad />
            </div>
        </main>
    );
}
