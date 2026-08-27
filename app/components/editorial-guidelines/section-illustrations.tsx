/* Section illustrations for /editorial-guidelines, in the same flat, palette-
   token style as the /ads-specs spot art: shapes only, no lettering, one motif
   per section so nothing repeats the hero's fact-checking scene. */

const shadow = (id: string) => (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="12"
            floodColor="#0f2433"
            floodOpacity="0.12"
        />
    </filter>
);

/* Our Purpose — a signpost on a route: the reader deciding which way to go. */
export function PurposeIllustration({ className }: { className?: string }) {
    /* [board path, fill] — alternating left/right arrows down the post. */
    const boards: [string, string, number, number][] = [
        ["M166,132 L280,132 L300,152 L280,172 L166,172 Z", "#0a5e85", 186, 74],
        ["M152,192 L48,192 L28,212 L48,232 L152,232 Z", "#1fb3d4", 60, 62],
        ["M166,252 L262,252 L282,272 L262,292 L166,292 Z", "#faa929", 186, 56],
    ];

    return (
        <svg
            viewBox="0 0 480 380"
            role="img"
            aria-label="A signpost pointing three ways along a dashed route toward a destination pin"
            className={className}
        >
            <defs>{shadow("eg-purpose-shadow")}</defs>

            {/* Decorations */}
            <g fill="#cbd5e1">
                {[344, 364].map((y) =>
                    [346, 366, 386].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
                    )),
                )}
            </g>
            <circle
                cx="392"
                cy="72"
                r="40"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 6"
            />
            <g stroke="#faa929" strokeWidth="3" strokeLinecap="round">
                <line x1="316" y1="326" x2="328" y2="326" />
                <line x1="322" y1="320" x2="322" y2="332" />
            </g>
            <circle cx="34" cy="108" r="4" fill="#e89690" />

            {/* Route */}
            <path
                d="M44,330 C130,330 128,246 214,232 C300,218 320,180 392,164"
                fill="none"
                stroke="#a8c2d3"
                strokeWidth="3"
                strokeDasharray="7 9"
                strokeLinecap="round"
            />
            <circle cx="44" cy="330" r="9" fill="#0a5e85" />
            <circle cx="44" cy="330" r="3.5" fill="#ffffff" />

            {/* Destination pin */}
            <g filter="url(#eg-purpose-shadow)">
                <path
                    d="M392,116 C376,116 364,128 364,144 C364,164 392,196 392,196 C392,196 420,164 420,144 C420,128 408,116 392,116 Z"
                    fill="#dc625a"
                />
            </g>
            <circle cx="392" cy="143" r="9" fill="#ffffff" />

            {/* Signpost */}
            <ellipse cx="159" cy="326" rx="46" ry="8" fill="#e2e8f0" />
            <rect x="152" y="118" width="14" height="208" rx="7" fill="#94a3b8" />
            <g filter="url(#eg-purpose-shadow)">
                {boards.map(([d, fill]) => (
                    <path key={d} d={d} fill={fill} />
                ))}
            </g>
            {/* Destination bars on each board */}
            <g fill="#ffffff" fillOpacity="0.85">
                {boards.map(([d, , x, w], i) => (
                    <rect
                        key={d}
                        x={x}
                        y={148 + i * 60}
                        width={w}
                        height="8"
                        rx="4"
                    />
                ))}
            </g>
        </svg>
    );
}

/* Our Core Editorial Values — a compass, sized for the trailing grid cell and
   drawn for a cobalt-gradient tile rather than a white card. */
export function ValuesCompass({ className }: { className?: string }) {
    const ticks = [0, 90, 180, 270];

    return (
        <svg
            viewBox="0 0 200 200"
            role="img"
            aria-label="A compass, its needle pointing north"
            className={className}
        >
            <circle cx="100" cy="100" r="78" fill="#ffffff" fillOpacity="0.08" />
            <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.35"
                strokeWidth="3"
            />
            <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.2"
                strokeWidth="2"
                strokeDasharray="3 7"
            />
            <g
                stroke="#ffffff"
                strokeOpacity="0.5"
                strokeWidth="3"
                strokeLinecap="round"
            >
                {ticks.map((deg) => (
                    <line
                        key={deg}
                        x1="100"
                        y1="26"
                        x2="100"
                        y2="38"
                        transform={`rotate(${deg} 100 100)`}
                    />
                ))}
            </g>
            <path d="M100,44 L116,100 L100,100 Z" fill="#faa929" />
            <path d="M100,44 L84,100 L100,100 Z" fill="#fcc570" />
            <path d="M100,156 L116,100 L100,100 Z" fill="#ffffff" />
            <path
                d="M100,156 L84,100 L100,100 Z"
                fill="#ffffff"
                fillOpacity="0.7"
            />
            <circle cx="100" cy="100" r="8" fill="#023d58" />
            <circle cx="100" cy="100" r="8" fill="none" stroke="#ffffff" strokeWidth="2" />
        </svg>
    );
}

/* How We Select and Feature Programs — a shortlist: a stack of provider cards
   with the front one verified. */
export function SelectionIllustration({ className }: { className?: string }) {
    const starPath =
        "M0,-7 L1.9,-2.4 L6.7,-2.2 L2.9,0.9 L4.1,5.7 L0,2.8 L-4.1,5.7 L-2.9,0.9 L-6.7,-2.2 L-1.9,-2.4 Z";

    return (
        <svg
            viewBox="0 0 480 380"
            role="img"
            aria-label="A stack of provider cards with the front one carrying a verified checkmark and a review rating"
            className={className}
        >
            <defs>
                {shadow("eg-selection-shadow")}
                <path id="eg-selection-star" d={starPath} />
            </defs>

            {/* Decorations */}
            <g fill="#cbd5e1">
                {[340, 360].map((y) =>
                    [30, 50, 70].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
                    )),
                )}
            </g>
            <circle
                cx="404"
                cy="64"
                r="36"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 6"
            />
            <g stroke="#faa929" strokeWidth="3" strokeLinecap="round">
                <line x1="38" y1="98" x2="50" y2="98" />
                <line x1="44" y1="92" x2="44" y2="104" />
            </g>
            <circle cx="446" cy="196" r="5" fill="#98dceb" />

            {/* Cards behind — the field we're choosing from */}
            <rect
                x="146"
                y="66"
                width="216"
                height="168"
                rx="14"
                fill="#eef4f8"
                stroke="#d3e0e9"
            />
            <rect
                x="124"
                y="94"
                width="260"
                height="168"
                rx="14"
                fill="#ffffff"
                stroke="#e2e8f0"
            />

            {/* Front card — the one we'd feature */}
            <g filter="url(#eg-selection-shadow)">
                <rect
                    x="94"
                    y="134"
                    width="300"
                    height="176"
                    rx="16"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                />
            </g>
            <circle cx="130" cy="172" r="18" fill="#0a5e85" />
            <rect x="160" y="162" width="118" height="11" rx="5.5" fill="#334155" />
            <rect x="160" y="181" width="76" height="8" rx="4" fill="#cbd5e1" />
            <g fill="#faa929">
                {[130, 150, 170, 190, 210].map((x) => (
                    <use
                        key={x}
                        href="#eg-selection-star"
                        transform={`translate(${x},222)`}
                    />
                ))}
            </g>
            <g fill="#e2e8f0">
                <rect x="118" y="248" width="252" height="8" rx="4" />
                <rect x="118" y="268" width="206" height="8" rx="4" />
            </g>
            <rect x="118" y="288" width="86" height="10" rx="5" fill="#bae7f2" />

            {/* Verified stamp, straddling the front card's corner */}
            <g filter="url(#eg-selection-shadow)">
                <circle cx="376" cy="148" r="28" fill="#68af74" />
            </g>
            <path
                d="M363,148 L372,157 L390,138"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* Who Writes for GoAbroad — a stack of bylines and the pen that filled them. */
export function WritersIllustration({ className }: { className?: string }) {
    /* [y, x offset, avatar tint] per byline chip. */
    const chips: [number, number, string][] = [
        [88, 62, "#bae7f2"],
        [180, 100, "#fdd79d"],
        [272, 138, "#b9dabf"],
    ];

    return (
        <svg
            viewBox="0 0 480 380"
            role="img"
            aria-label="Three author bylines stacked in a fan, beside a pen"
            className={className}
        >
            <defs>
                {shadow("eg-writers-shadow")}
                {chips.map(([y, x]) => (
                    <clipPath key={y} id={`eg-writers-avatar-${y}`}>
                        <circle cx={x + 40} cy={y + 38} r="22" />
                    </clipPath>
                ))}
            </defs>

            {/* Decorations */}
            <g fill="#cbd5e1">
                {[36, 56].map((y) =>
                    [26, 46, 66].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
                    )),
                )}
            </g>
            <circle
                cx="60"
                cy="242"
                r="30"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 6"
            />
            <g stroke="#faa929" strokeWidth="3" strokeLinecap="round">
                <line x1="446" y1="292" x2="458" y2="292" />
                <line x1="452" y1="286" x2="452" y2="298" />
            </g>
            <circle cx="428" cy="342" r="5" fill="#e89690" />

            {/* Byline chips */}
            {chips.map(([y, x, tint]) => (
                <g key={y}>
                    <g filter="url(#eg-writers-shadow)">
                        <rect
                            x={x}
                            y={y}
                            width="250"
                            height="76"
                            rx="16"
                            fill="#ffffff"
                            stroke="#e2e8f0"
                        />
                    </g>
                    <circle cx={x + 40} cy={y + 38} r="22" fill={tint} />
                    <g
                        clipPath={`url(#eg-writers-avatar-${y})`}
                        fill="#0a5e85"
                    >
                        <circle cx={x + 40} cy={y + 31} r="8" />
                        <circle cx={x + 40} cy={y + 56} r="14" />
                    </g>
                    <rect
                        x={x + 76}
                        y={y + 26}
                        width="104"
                        height="10"
                        rx="5"
                        fill="#334155"
                    />
                    <rect
                        x={x + 76}
                        y={y + 46}
                        width="142"
                        height="8"
                        rx="4"
                        fill="#cbd5e1"
                    />
                </g>
            ))}

            {/* Pen */}
            <g filter="url(#eg-writers-shadow)">
                <path d="M418,42 L444,68 L372,140 L346,114 Z" fill="#0a5e85" />
            </g>
            <path d="M406,54 L432,80 L420,92 L394,66 Z" fill="#ffffff" fillOpacity="0.25" />
            <path d="M346,114 L372,140 L332,154 Z" fill="#faa929" />
            <path d="M338,146 L332,154 L344,150 Z" fill="#023d58" />
        </svg>
    );
}
