import Testimonial from "../../reusable/testimonials/testimonials";
import AmplifyBrand from "../version-two/amplify-brand";
import BenefitPartnership from "../version-two/benefit-partnership";
import GlobalAudience from "../version-two/global-audience";
import GrowGoAbroad from "../version-two/grow-goabroad";
import HeroSection from "../version-two/hero-section";
import OnlinePresence from "./online-presence";
import WhyGoAbroadWorks from "./why-goabroad-works";

export default function VersionThree() {
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
