import type { Metadata } from "next";
import AdSpecCard from "../components/ads-specs/ad-spec-card";
import {
  adSections,
  bestPractices,
  directories,
  pageTypes,
  totalAdCount,
} from "../components/ads-specs/data";
import SpecsSidebar, {
  MobileJumpNav,
  type NavSection,
} from "../components/ads-specs/specs-nav";
import Breadcrumbs from "../components/reusable/breadcrumbs";
import HeroIllustration from "../components/ads-specs/hero-illustration";
import PageTypeIllustration from "../components/ads-specs/page-type-illustrations";
import BestPracticeIllustration from "../components/ads-specs/best-practice-illustrations";

export const metadata: Metadata = {
  title: "Specifications | GoAbroad Prototypes",
  description:
    "Every GoAbroad ad placement in one place — image sizes, character limits, and tips for each ad type.",
};

/* Itinerary stops for the Best Practices route: departure, current leg
   (sun), destination (outlined). Route variant sits on the cobalt gradient
   band; card variant sits inside the white cards on mobile. */
const stopStylesRoute = [
  "bg-white text-cobalt-700",
  "bg-sun-500 text-cobalt-700",
  // Solid cobalt fill so the dashed route leg can't show through the
  // outlined destination stop.
  "border-2 border-white bg-cobalt-600 text-white",
];
const stopStylesCard = [
  "bg-cobalt-500 text-white",
  "bg-sun-500 text-cobalt-700",
  "border-2 border-cobalt-500 bg-white text-cobalt-500",
];

/* Quick links cover only the ad sections — the page-type and
   best-practice overviews live above the two-column area. */
const navSections: NavSection[] = adSections.map((section) => ({
  id: section.id,
  label: section.navLabel,
  ads: section.ads.map((ad) => ({
    id: ad.id,
    code: ad.code,
    name: ad.name,
  })),
}));

export default function AdsSpecsPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero — follows the /mygoabroad redesign pattern:
                bg-slate-100 section, cobalt kicker, dark headline,
                photo column on the right (md:w-[45%], rounded-lg). */}
      <header className="w-full overflow-hidden bg-slate-100">
        <Breadcrumbs link="ads-specs" page="Specifications" />
        <div className="mx-auto max-w-7xl px-4 xl:px-0">
          <div className="flex flex-col-reverse md:flex-row md:items-stretch">
            <div className="flex flex-1 flex-col items-start pt-6 pb-10 text-left md:py-12 md:pr-12">
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-cobalt-500">
                Partner Resources
              </p>
              <h1 className="text-4xl font-bold leading-tight text-neutral-900 lg:text-5xl">
                GoAbroad.com Advertising Specifications
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                Everything you need to build great-looking ads on GoAbroad —
                image sizes, character limits, and tips for every placement. Use
                the quick links to jump straight to the ad type you&apos;re
                working on.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <p className="text-3xl font-bold text-cobalt-500">
                    {totalAdCount}
                  </p>
                  <p className="text-sm text-slate-600">Ad types</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cobalt-500">
                    {adSections.length}
                  </p>
                  <p className="text-sm text-slate-600">Placement areas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cobalt-500">
                    {directories.length}
                  </p>
                  <p className="text-sm text-slate-600">Program directories</p>
                </div>
              </div>
            </div>
            <div className="hidden shrink-0 md:block md:w-[45%] md:self-stretch md:py-8">
              <div className="flex h-full w-full items-center justify-center">
                <HeroIllustration className="h-auto w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileJumpNav sections={navSections} />

      {/* Full-width overview sections — the quick-links sidebar only
          accompanies the ad specs below. */}
      <div className="mx-auto max-w-7xl space-y-20 px-4 pt-16 md:space-y-24 md:pt-24 xl:px-0">
        {/* Page types overview */}
        <section id="page-types" className="scroll-mt-28">
            <p className="text-sm font-semibold uppercase tracking-widest text-cobalt-500">
              Start here
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
              Overview of GoAbroad Page Types
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Each ad placement lives on one of these pages. Knowing who&apos;s
              browsing each page type helps you pick the right placement and
              craft content that lands.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {pageTypes.map((pageType) => (
                <div
                  key={pageType.name}
                  className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-40 w-full">
                    <PageTypeIllustration
                      name={pageType.name}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-neutral-800">
                      {pageType.name}
                    </h3>
                    <ul className="space-y-2">
                      {pageType.points.map((point, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm leading-relaxed text-slate-500"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-500"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best practices */}
          <section id="best-practices" className="scroll-mt-28">
            <div className="rounded-2xl bg-linear-to-br from-cobalt-700 via-cobalt-600 to-cobalt-500 px-6 py-10 sm:px-10 md:py-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-sun-500">
                Before you build
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                GoAbroad Advertising Best Practices
              </h2>
              <p className="mt-2 max-w-2xl text-white/80">
                Three habits that make every placement perform better, whichever
                ad type you go with.
              </p>
              {/* Itinerary route strip — one stop above each card,
                            dashed legs with a plane and a pin (decorative).
                            The legs are segments with gaps at the icons, so
                            nothing needs masking against the gradient. */}
              <div aria-hidden className="relative mt-8 hidden sm:block">
                <div className="absolute top-1/2 right-[68.9%] left-[16.666%] -translate-y-1/2 border-t-2 border-dashed border-white/40" />
                <div className="absolute top-1/2 right-[35.6%] left-[35.6%] -translate-y-1/2 border-t-2 border-dashed border-white/40" />
                <div className="absolute top-1/2 right-[16.666%] left-[68.9%] -translate-y-1/2 border-t-2 border-dashed border-white/40" />
                <span className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 text-sun-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </span>
                <span className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 text-roman-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-[18px] w-[18px]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="relative grid grid-cols-3 gap-8">
                  {stopStylesRoute.map((style, i) => (
                    <div key={i} className="flex justify-center">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${style}`}
                      >
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-8 sm:mt-4 sm:grid-cols-3">
                {bestPractices.map((practice, i) => (
                  <div
                    key={practice.title}
                    className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6"
                  >
                    <div className="h-40 w-full">
                      <BestPracticeIllustration
                        index={i}
                        className="h-full w-full"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:hidden ${stopStylesCard[i]}`}
                      >
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-neutral-800">
                        <span className="sr-only">{`Step ${i + 1}: `}</span>
                        {practice.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {practice.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

      </div>

      {/* Ad specs — the quick-links sidebar sits side by side with these
          sections only. */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 xl:px-0 lg:grid lg:grid-cols-[1fr_18rem] lg:gap-12">
        <main className="min-w-0 space-y-20 md:space-y-24">
          {adSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <p className="text-sm font-semibold uppercase tracking-widest text-cobalt-500">
                {section.ads.length} ad type
                {section.ads.length > 1 ? "s" : ""}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-800 sm:text-3xl">
                {section.title}
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                {section.description}
              </p>
              <div className="mt-8 space-y-10">
                {section.ads.map((ad) => (
                  <AdSpecCard key={ad.id} ad={ad} />
                ))}
              </div>
            </section>
          ))}

          <p className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
            Questions about a placement? Your GoAbroad account manager is happy
            to help you get your ads looking their best.
          </p>
        </main>

        <aside className="hidden lg:block">
          <SpecsSidebar sections={navSections} />
        </aside>
      </div>
    </div>
  );
}
