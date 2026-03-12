import BasicProgram from "./advertising-solutions/basic-program";
import ContentMarketing from "./advertising-solutions/content-marketing";
import DisplayPlacements from "./advertising-solutions/display-placements";
import EmailMarketing from "./advertising-solutions/email-marketing";
import FeaturedListings from "./advertising-solutions/featured-listing";
import SearchResult from "./advertising-solutions/search-results";
import SocialMedia from "./advertising-solutions/social-media";
import TravelBrand from "./advertising-solutions/travel-brand";

export default function AdvertisingSolution() {
    return (
        <section className="w-full bg-slate-50 h-full py-16 flex items-center justify-center flex-col">
            <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 xl:px-0">
                <h2 className="text-slate-800 mb-12 font-bold text-[28px] text-center">
                    Our Advertising Solutions
                </h2>
                <div className="space-y-14">
                    <BasicProgram />
                    <DisplayPlacements />
                    <FeaturedListings />
                    <SearchResult />
                    <EmailMarketing />
                    <SocialMedia />
                    <ContentMarketing />
                    <TravelBrand />
                </div>
            </div>
        </section>
    );
}
