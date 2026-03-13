import AdvertisingBrand from "./advertising-brand";
import EngageAudience from "./engage-audience";
import GrowWithGoAbroad from "./grow-goabroad";
import HeroSection from "./hero-section";
import OnlinePresence from "./online-presence";
import Testimonials from "./testimonial";
import WhyGoAbroadWorks from "./why-goabroad-works";

export default function VersionOne() {
    return (
        <main className="w-full flex flex-col items-center justify-center">
            <HeroSection />
            <div className="w-full max-w-7xl flex flex-col gap-14 py-12 px-4 md:px-6 lg:px-8 xl:px-0">
                <WhyGoAbroadWorks />
                <EngageAudience />
                <OnlinePresence />
                <AdvertisingBrand />
                <Testimonials />
                <GrowWithGoAbroad />
            </div>
        </main>
    );
}
