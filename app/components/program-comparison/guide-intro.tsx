"use client";


interface GuideIntroProps {
    intro: string;
    onReadMore: () => void;
}

export default function GuideIntro({ intro, onReadMore }: GuideIntroProps) {
    return (
        <div id="guide_intro" className="px-4 lg:px-0">
            <div className="line-clamp-5">{intro}</div>
            <a
                className="mt-4 flex w-fit cursor-pointer items-center gap-2 text-sm font-bold hover:underline"
                onClick={(e) => {
                    e.preventDefault();
                    onReadMore();
                }}
                href="#guides"
            >
                Read More
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="-rotate-90 transform"
                    aria-hidden="true"
                >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
            </a>
        </div>
    );
}
