/* Editorial-review illustration for the /editorial-guidelines hero: a GoAbroad
   article being fact-checked — a bylined article card under a magnifier, a
   verified-reviews card, and a shield-check seal. Shapes only (no lettering) so
   it reads at any size, and only palette tokens for colour. */
export default function HeroIllustration({
    className,
}: {
    className?: string;
}) {
    const starPath =
        "M0,-7 L1.9,-2.4 L6.7,-2.2 L2.9,0.9 L4.1,5.7 L0,2.8 L-4.1,5.7 L-2.9,0.9 L-6.7,-2.2 L-1.9,-2.4 Z";

    /* Article body copy lines — narrow on the last rows so the paragraph
       reads as prose rather than a block. */
    const bodyLines: [number, number][] = [
        [248, 264],
        [268, 240],
        [288, 256],
        [308, 200],
        [328, 168],
    ];

    return (
        <svg
            viewBox="0 0 560 440"
            role="img"
            aria-label="A GoAbroad article being fact-checked: a bylined article under a magnifying glass, a card of verified reviews, and a shield with a checkmark"
            className={className}
        >
            <defs>
                <filter
                    id="eg-hero-shadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                >
                    <feDropShadow
                        dx="0"
                        dy="8"
                        stdDeviation="12"
                        floodColor="#0f2433"
                        floodOpacity="0.12"
                    />
                </filter>
                <clipPath id="eg-hero-avatar">
                    <circle cx="84" cy="201" r="14" />
                </clipPath>
                <path id="eg-hero-star" d={starPath} />
            </defs>

            {/* Decorations */}
            <g fill="#cbd5e1">
                {[386, 406, 426].map((y) =>
                    [20, 40, 60, 80].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
                    )),
                )}
            </g>
            <circle
                cx="470"
                cy="86"
                r="52"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 6"
            />
            <g stroke="#faa929" strokeWidth="3" strokeLinecap="round">
                <line x1="404" y1="182" x2="416" y2="182" />
                <line x1="410" y1="176" x2="410" y2="188" />
            </g>
            <circle cx="536" cy="180" r="5" fill="#e89690" />
            <circle cx="18" cy="150" r="4" fill="#98dceb" />

            {/* Shield-check seal, inside the dashed ring */}
            <g filter="url(#eg-hero-shadow)">
                <path
                    d="M470,50 L502,64 L502,94 C502,113 488,127 470,134 C452,127 438,113 438,94 L438,64 Z"
                    fill="#0a5e85"
                />
            </g>
            <path
                d="M455,92 L466,103 L487,80"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Article card */}
            <g filter="url(#eg-hero-shadow)">
                <rect
                    x="48"
                    y="48"
                    width="336"
                    height="316"
                    rx="16"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                />
            </g>
            <circle cx="72" cy="74" r="5" fill="#dc625a" />
            <circle cx="92" cy="74" r="5" fill="#faa929" />
            <circle cx="112" cy="74" r="5" fill="#68af74" />
            <line
                x1="48"
                y1="92"
                x2="384"
                y2="92"
                stroke="#f1f5f9"
                strokeWidth="2"
            />

            {/* Kicker + headline */}
            <rect x="72" y="110" width="72" height="12" rx="6" fill="#0f83b9" />
            <rect
                x="72"
                y="136"
                width="232"
                height="16"
                rx="8"
                fill="#334155"
            />
            <rect
                x="72"
                y="162"
                width="168"
                height="16"
                rx="8"
                fill="#334155"
            />

            {/* Byline: author avatar, name, date */}
            <circle cx="84" cy="201" r="14" fill="#bae7f2" />
            <g clipPath="url(#eg-hero-avatar)" fill="#0a5e85">
                <circle cx="84" cy="196" r="5.5" />
                <circle cx="84" cy="212" r="9" />
            </g>
            <rect
                x="108"
                y="194"
                width="86"
                height="9"
                rx="4.5"
                fill="#94a3b8"
            />
            <rect
                x="108"
                y="209"
                width="56"
                height="7"
                rx="3.5"
                fill="#cbd5e1"
            />
            {/* Verified-author tick beside the byline */}
            <circle cx="212" cy="199" r="9" fill="#68af74" />
            <path
                d="M207.5,199 L211,202.5 L217,196"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <line
                x1="72"
                y1="230"
                x2="360"
                y2="230"
                stroke="#f1f5f9"
                strokeWidth="2"
            />

            {/* Article body */}
            <g fill="#cbd5e1">
                {bodyLines.map(([y, w]) => (
                    <rect key={y} x="72" y={y} width={w} height="9" rx="4.5" />
                ))}
            </g>

            {/* Magnifier over the body copy — the fact-checking pass */}
            <g filter="url(#eg-hero-shadow)">
                <circle
                    cx="150"
                    cy="304"
                    r="34"
                    fill="#ffffff"
                    fillOpacity="0.72"
                />
            </g>
            <circle
                cx="150"
                cy="304"
                r="34"
                fill="none"
                stroke="#0a5e85"
                strokeWidth="6"
            />
            <line
                x1="175"
                y1="329"
                x2="198"
                y2="352"
                stroke="#0a5e85"
                strokeWidth="9"
                strokeLinecap="round"
            />
            <path
                d="M137,304 L147,314 L165,294"
                fill="none"
                stroke="#68af74"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Verified-reviews card, overlapping bottom-right */}
            <g filter="url(#eg-hero-shadow)">
                <rect
                    x="340"
                    y="240"
                    width="184"
                    height="156"
                    rx="14"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                />
            </g>
            <rect
                x="360"
                y="260"
                width="96"
                height="10"
                rx="5"
                fill="#334155"
            />
            <g fill="#faa929">
                {[368, 388, 408, 428, 448].map((x) => (
                    <use
                        key={x}
                        href="#eg-hero-star"
                        transform={`translate(${x},292)`}
                    />
                ))}
            </g>
            {[316, 340, 364].map((y) => (
                <g key={y}>
                    <circle cx="366" cy={y} r="7" fill="#b9dabf" />
                    <path
                        d={`M362.5,${y} L365.5,${y + 3} L370,${y - 3}`}
                        fill="none"
                        stroke="#4a7c52"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <rect
                        x="382"
                        y={y - 4}
                        width={y === 340 ? 106 : 122}
                        height="8"
                        rx="4"
                        fill="#cbd5e1"
                    />
                </g>
            ))}
        </svg>
    );
}
