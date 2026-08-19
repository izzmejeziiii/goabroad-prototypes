import type { AdSpec } from "./data";
import AdSnapshot, { AdLastUpdated } from "./ad-snapshot";

/* Icon per spec-field type, matched loosely on the field label so variants
   like "Buttons", "Button (desktop only)", or "Thumbnail Image" still map. */
function fieldIconKey(label: string) {
    const l = label.toLowerCase();
    if (l.includes("image") || l.includes("thumbnail") || l.includes("photo"))
        return "image";
    if (l.includes("placement")) return "placement";
    if (l.includes("button")) return "button";
    if (l.includes("link")) return "link";
    if (l.includes("title")) return "title";
    return "description";
}

const fieldIcons: Record<string, React.ReactElement> = {
    title: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5.5h14M12 5.5V19" />
    ),
    description: (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 11h16M4 16h9" />
    ),
    image: (
        <>
            <rect x="3.5" y="5" width="17" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.5 16.5L10 12l3 3 2.5-2.5 3 3"
            />
        </>
    ),
    button: (
        <>
            <rect x="3" y="6.5" width="13" height="7.5" rx="2" />
            <path
                fill="currentColor"
                stroke="none"
                d="M14.5 12.5l6.2 2.4-2.7 1.1-1.1 2.7z"
            />
        </>
    ),
    link: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
    ),
    placement: (
        <>
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M10 10v9" />
        </>
    ),
    video: (
        <>
            <circle cx="12" cy="12" r="8.5" />
            <path
                fill="currentColor"
                stroke="none"
                d="M10 8.75v6.5l5.5-3.25z"
            />
        </>
    ),
    spark: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5c.75 4.2 1.55 5 5.75 5.75-4.2.75-5 1.55-5.75 5.75-.75-4.2-1.55-5-5.75-5.75 4.2-.75 5-1.55 5.75-5.75Z"
        />
    ),
};

/* Icon for a quick-fact chip, matched on the fact text. */
function factIconKey(fact: string) {
    const f = fact.toLowerCase();
    if (f.includes("char"))
        return f.includes("description") ? "description" : "title";
    if (f.includes("px") || /\d\s*×\s*\d/.test(fact)) return "image";
    if (f.includes("video")) return "video";
    return "spark";
}

export default function AdSpecCard({ ad }: { ad: AdSpec }) {
    return (
        <article
            id={ad.id}
            className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            {/* Card header — tinted band. */}
            <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                    {/* Luggage-tag badge: clipped nose on the left with a
                        punched hole, like a baggage tag. */}
                    <span className="relative inline-flex shrink-0 items-center rounded-md bg-cobalt-500 py-1.5 pr-3 pl-5 text-sm font-semibold text-white [clip-path:polygon(0_50%,12px_0,100%_0,100%_100%,12px_100%)]">
                        <span
                            aria-hidden
                            className="absolute top-1/2 left-[9px] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                        />
                        {ad.code}
                    </span>
                    <h3 className="min-w-0 flex-1 text-lg font-bold tracking-tight text-neutral-800 sm:text-xl">
                        {ad.name}
                    </h3>
                    <AdLastUpdated
                        ids={ad.snapshotIds ?? [ad.id]}
                        className="ml-auto hidden shrink-0 whitespace-nowrap sm:inline"
                    />
                </div>
                {/* On mobile the date drops below the chips, left-aligned;
                    on sm+ it lives beside the title instead. */}
                {ad.quickFacts.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {ad.quickFacts.map((fact) => (
                            <span
                                key={fact}
                                className="inline-flex items-center gap-1.5 rounded-full border border-sun-300 bg-white px-3 py-1 text-xs font-semibold text-sun-700"
                            >
                                <svg
                                    aria-hidden
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-3.5 w-3.5 shrink-0"
                                >
                                    {fieldIcons[factIconKey(fact)]}
                                </svg>
                                {fact}
                            </span>
                        ))}
                    </div>
                )}
                <AdLastUpdated
                    ids={ad.snapshotIds ?? [ad.id]}
                    className="mt-3 block text-left sm:hidden"
                />
            </div>

            <div className="px-6 py-6 sm:px-8">
                {/* Live example captures from the ad snapshot tool — only
                    renders once a snapshot has been published for this ad. */}
                <AdSnapshot ids={ad.snapshotIds ?? [ad.id]} />

                {/* Spec fields */}
                <dl className="grid gap-5 sm:grid-cols-2">
                    {ad.fields.map((field) => (
                        <div
                            key={field.label}
                            className="rounded-xl bg-slate-50 p-4"
                        >
                            <dt className="flex items-center gap-2.5">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-cobalt-500">
                                    <svg
                                        aria-hidden
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                        className="h-4 w-4"
                                    >
                                        {fieldIcons[fieldIconKey(field.label)]}
                                    </svg>
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-cobalt-600">
                                    {field.label}
                                </span>
                            </dt>
                            {field.headline && (
                                <p className="mt-2.5 text-sm font-bold text-neutral-800">
                                    {field.headline}
                                </p>
                            )}
                            {field.notes.length > 0 && (
                                <dd className={field.headline ? "mt-2" : "mt-2.5"}>
                                    <ul className="space-y-1.5">
                                        {field.notes.map((note, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-2 text-sm leading-relaxed text-slate-600"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-500"
                                                />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            )}
                        </div>
                    ))}
                </dl>

                {/* Auto-pulled components */}
                {ad.autoPulled && ad.autoPulled.length > 0 && (
                    <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Automatically pulled from your account
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {ad.autoPulled.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                                >
                                    <svg
                                        className="h-3 w-3 shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips */}
                {ad.tips.length > 0 && (
                    <div className="mt-6 rounded-xl border-l-4 border-sun-500 bg-sun-200/20 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-sun-700">
                            Tips from the GoAbroad team
                        </p>
                        <ul className="mt-2 space-y-2">
                            {ad.tips.map((tip, i) => (
                                <li
                                    key={i}
                                    className="flex gap-2.5 text-sm leading-relaxed text-slate-700"
                                >
                                    <svg
                                        aria-hidden
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="mt-0.5 h-4 w-4 shrink-0 text-sun-700"
                                    >
                                        <circle cx="12" cy="12" r="9" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.5 12.5l2.5 2.5 4.5-5"
                                        />
                                    </svg>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </article>
    );
}
