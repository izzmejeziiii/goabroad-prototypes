/* Companion illustration for the "Why You Can Trust What You Read on GoAbroad"
   section: an open book with a seal of approval — the reader's side of the
   promise, where the hero's magnifier shows the editorial side. Shapes only,
   palette tokens only. */
export default function TrustIllustration({
    className,
}: {
    className?: string;
}) {
    /* Scalloped edge of the seal, drawn as a ring of circles behind the face. */
    const sealCx = 352;
    const sealCy = 292;
    const scallops = Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        return {
            cx: sealCx + Math.cos(angle) * 34,
            cy: sealCy + Math.sin(angle) * 34,
        };
    });

    /* Page copy: [y, width] per line, heading row first. */
    const leftLines: [number, number][] = [
        [186, 92],
        [206, 118],
        [226, 104],
    ];
    const rightLines: [number, number][] = [
        [186, 96],
        [206, 120],
        [226, 88],
    ];

    return (
        <svg
            viewBox="0 0 480 380"
            role="img"
            aria-label="An open book carrying a seal of approval, with a bookmark and a heart"
            className={className}
        >
            <defs>
                <filter
                    id="eg-trust-shadow"
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
            </defs>

            {/* Decorations */}
            <g fill="#cbd5e1">
                {[330, 350].map((y) =>
                    [24, 44, 64].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
                    )),
                )}
            </g>
            <circle
                cx="410"
                cy="66"
                r="38"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="4 6"
            />
            <g stroke="#faa929" strokeWidth="3" strokeLinecap="round">
                <line x1="42" y1="126" x2="54" y2="126" />
                <line x1="48" y1="120" x2="48" y2="132" />
            </g>
            <circle cx="452" cy="180" r="5" fill="#98dceb" />
            <circle cx="126" cy="52" r="4" fill="#e89690" />

            {/* Book cover, peeking out behind the pages */}
            <g fill="#0a5e85">
                <path d="M240,148 C198,130 126,122 66,130 L66,286 C126,278 198,286 240,302 Z" />
                <path d="M240,148 C282,130 354,122 414,130 L414,286 C354,278 282,286 240,302 Z" />
            </g>

            {/* Pages — hairline stroke so they read as paper against the
                section's white background, not just as gaps in the cover. */}
            <g filter="url(#eg-trust-shadow)" fill="#ffffff" stroke="#e2e8f0">
                <path d="M240,138 C200,121 130,113 74,121 L74,272 C130,264 200,272 240,288 Z" />
                <path d="M240,138 C280,121 350,113 406,121 L406,272 C350,264 280,272 240,288 Z" />
            </g>

            {/* Page copy — heading row in slate, body rows lighter */}
            <rect x="96" y="152" width="70" height="11" rx="5.5" fill="#334155" />
            <g fill="#cbd5e1">
                {leftLines.map(([y, w]) => (
                    <rect key={y} x="96" y={y} width={w} height="8" rx="4" />
                ))}
            </g>
            <rect
                x="262"
                y="152"
                width="58"
                height="11"
                rx="5.5"
                fill="#334155"
            />
            <g fill="#cbd5e1">
                {rightLines.map(([y, w]) => (
                    <rect key={y} x="262" y={y} width={w} height="8" rx="4" />
                ))}
            </g>

            {/* Bookmark, lying in the gutter */}
            <path
                d="M231,132 L249,132 L249,330 L240,318 L231,330 Z"
                fill="#faa929"
            />

            {/* Seal of approval, overlapping the lower right page */}
            <g fill="#084b6a">
                {scallops.map(({ cx, cy }) => (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" />
                ))}
            </g>
            {/* Ribbon tails, tucked under the seal face */}
            <path d="M334,318 L318,356 L340,348 Z" fill="#c85952" />
            <path d="M370,318 L386,356 L364,348 Z" fill="#dc625a" />
            <g filter="url(#eg-trust-shadow)">
                <circle cx={sealCx} cy={sealCy} r="34" fill="#0a5e85" />
            </g>
            <circle
                cx={sealCx}
                cy={sealCy}
                r="26"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.35"
                strokeWidth="2"
            />
            <path
                d="M339,292 L349,302 L367,282"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Heart chip floating over the top-left corner */}
            <g filter="url(#eg-trust-shadow)">
                <circle
                    cx="96"
                    cy="86"
                    r="26"
                    fill="#ffffff"
                    stroke="#e2e8f0"
                />
            </g>
            <path
                d="M96,99 C96,99 84,91.5 84,83 C84,78.5 87.5,75 92,75 C94.4,75 96,76.6 96,76.6 C96,76.6 97.6,75 100,75 C104.5,75 108,78.5 108,83 C108,91.5 96,99 96,99 Z"
                fill="#dc625a"
            />
        </svg>
    );
}
