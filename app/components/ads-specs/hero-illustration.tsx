/* Blueprint-style illustration of a GoAbroad ad placement: a desktop ad card
   with a mobile variant, annotated with size/character-limit callouts. Uses
   only palette tokens (cobalt, brand, primary, sun, roman, fern, slate). */
export default function HeroIllustration({
    className,
}: {
    className?: string;
}) {
    const starPath =
        "M0,-7 L1.9,-2.4 L6.7,-2.2 L2.9,0.9 L4.1,5.7 L0,2.8 L-4.1,5.7 L-2.9,0.9 L-6.7,-2.2 L-1.9,-2.4 Z";

    return (
        <svg
            viewBox="0 0 560 440"
            role="img"
            aria-label="Anatomy of a GoAbroad ad: a desktop ad card and mobile variant with image size and character limit annotations"
            className={className}
        >
            <defs>
                <filter id="ads-hero-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                        dx="0"
                        dy="8"
                        stdDeviation="12"
                        floodColor="#0f2433"
                        floodOpacity="0.12"
                    />
                </filter>
                <clipPath id="ads-hero-img-main">
                    <rect x="80" y="116" width="296" height="124" rx="10" />
                </clipPath>
                <clipPath id="ads-hero-img-mobile">
                    <rect x="372" y="232" width="136" height="64" rx="8" />
                </clipPath>
                <path id="ads-hero-star" d={starPath} />
            </defs>

            {/* Decorations */}
            <g fill="#cbd5e1">
                {[384, 404, 424].map((y) =>
                    [24, 44, 64, 84].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
                    )),
                )}
            </g>
            <circle
                cx="490"
                cy="80"
                r="40"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 6"
            />
            <g stroke="#faa929" strokeWidth="3" strokeLinecap="round">
                <line x1="519" y1="170" x2="531" y2="170" />
                <line x1="525" y1="164" x2="525" y2="176" />
            </g>
            <circle cx="440" cy="30" r="5" fill="#e89690" />

            {/* Horizontal dimension line (image width) above the desktop card */}
            <g stroke="#0a5e85" strokeWidth="1.5">
                <line x1="56" y1="36" x2="400" y2="36" />
                <line x1="56" y1="29" x2="56" y2="43" />
                <line x1="400" y1="29" x2="400" y2="43" />
            </g>
            <rect x="186" y="24" width="84" height="24" rx="12" fill="#eef4f8" stroke="#a8c2d3" />
            <text
                x="228"
                y="40"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="#0a5e85"
            >
                400 × 300
            </text>

            {/* Vertical dimension line (aspect ratio) left of the desktop card */}
            <g stroke="#0a5e85" strokeWidth="1.5">
                <line x1="36" y1="56" x2="36" y2="360" />
                <line x1="29" y1="56" x2="43" y2="56" />
                <line x1="29" y1="360" x2="43" y2="360" />
            </g>
            <rect x="16" y="196" width="40" height="24" rx="12" fill="#eef4f8" stroke="#a8c2d3" />
            <text
                x="36"
                y="212"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="#0a5e85"
            >
                4:3
            </text>

            {/* Desktop ad card */}
            <g filter="url(#ads-hero-shadow)">
                <rect x="56" y="56" width="344" height="304" rx="16" fill="#ffffff" stroke="#e2e8f0" />
            </g>
            <circle cx="80" cy="82" r="5" fill="#dc625a" />
            <circle cx="100" cy="82" r="5" fill="#faa929" />
            <circle cx="120" cy="82" r="5" fill="#68af74" />
            <line x1="56" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="2" />

            {/* Image placeholder with sun + mountains */}
            <rect x="80" y="116" width="296" height="124" rx="10" fill="#bae7f2" />
            <g clipPath="url(#ads-hero-img-main)">
                <circle cx="330" cy="146" r="13" fill="#faa929" />
                <path d="M96,240 L166,168 L216,240 Z" fill="#0f83b9" />
                <path d="M186,240 L246,186 L306,240 Z" fill="#0a5e85" />
            </g>

            {/* Title + description lines */}
            <rect x="80" y="258" width="200" height="14" rx="7" fill="#334155" />
            <rect x="80" y="284" width="296" height="9" rx="4.5" fill="#cbd5e1" />
            <rect x="80" y="301" width="232" height="9" rx="4.5" fill="#cbd5e1" />

            {/* Footer: logo, provider name, CTA */}
            <circle cx="94" cy="336" r="12" fill="#0a5e85" />
            <rect x="114" y="331" width="90" height="10" rx="5" fill="#94a3b8" />
            <rect x="284" y="322" width="92" height="28" rx="8" fill="#faa929" />
            <rect x="302" y="333" width="56" height="7" rx="3.5" fill="#ffffff" />

            {/* Character-limit chip floating over the image edge */}
            <g filter="url(#ads-hero-shadow)">
                <rect x="340" y="170" width="110" height="30" rx="15" fill="#ffffff" stroke="#fcc570" />
            </g>
            <circle cx="358" cy="185" r="5" fill="#faa929" />
            <text x="370" y="189" fontSize="12" fontWeight="600" fill="#b2781d">
                70 chars max
            </text>

            {/* Mobile ad card, overlapping bottom-right */}
            <g filter="url(#ads-hero-shadow)">
                <rect x="356" y="216" width="168" height="196" rx="14" fill="#ffffff" stroke="#e2e8f0" />
            </g>
            <rect x="372" y="232" width="136" height="64" rx="8" fill="#d3e0e9" />
            <g clipPath="url(#ads-hero-img-mobile)">
                <circle cx="482" cy="248" r="8" fill="#fcc570" />
                <path d="M384,296 L416,264 L448,296 Z" fill="#4a7a9b" />
                <path d="M436,296 L466,270 L496,296 Z" fill="#7ba0ba" />
            </g>
            <g fill="#faa929">
                {[380, 398, 416, 434, 452].map((x) => (
                    <use
                        key={x}
                        href="#ads-hero-star"
                        transform={`translate(${x},313)`}
                    />
                ))}
            </g>
            <rect x="372" y="326" width="104" height="10" rx="5" fill="#334155" />
            <rect x="372" y="344" width="124" height="8" rx="4" fill="#cbd5e1" />
            <rect x="372" y="364" width="136" height="26" rx="8" fill="#0a5e85" />
            <rect x="404" y="374" width="72" height="6" rx="3" fill="#ffffff" />
        </svg>
    );
}
