/* Kicker + heading, the rhythm every section on /ads-specs and
   /editorial-guidelines uses: small uppercase cobalt kicker (sun on the dark
   band), bold heading under it. The heading level follows the requirements
   doc's outline, so it is a prop rather than a fixed h2. */
export default function SectionHead({
    kicker,
    title,
    as: Tag = "h2",
    tone = "light",
    size = "lg",
}: {
    kicker: string;
    title: string;
    as?: "h2" | "h3" | "h4";
    tone?: "light" | "dark";
    /** `lg` for section titles, `md` for sub-sections inside one. */
    size?: "lg" | "md";
}) {
    const dark = tone === "dark";
    return (
        <>
            <p
                className={`text-sm font-semibold tracking-widest uppercase ${
                    dark ? "text-sun-500" : "text-cobalt-500"
                }`}
            >
                {kicker}
            </p>
            <Tag
                className={`mt-1 font-bold tracking-tight ${
                    size === "lg"
                        ? "text-2xl sm:text-3xl"
                        : "text-xl sm:text-2xl"
                } ${dark ? "text-white" : "text-neutral-800"}`}
            >
                {title}
            </Tag>
        </>
    );
}
