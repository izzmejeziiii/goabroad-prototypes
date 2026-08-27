import type { IconType } from "react-icons";
import {
    HiOutlineAcademicCap,
    HiOutlineCheckBadge,
    HiOutlineChatBubbleLeftRight,
    HiOutlineClock,
    HiOutlineEye,
    HiOutlineGlobeAmericas,
    HiOutlineHandRaised,
    HiOutlineLifebuoy,
    HiOutlineLightBulb,
    HiOutlinePaperAirplane,
    HiOutlinePencilSquare,
    HiOutlineShieldCheck,
    HiOutlineStar,
    HiOutlineUserGroup,
    HiOutlineUsers,
} from "react-icons/hi2";

/* One place for every icon the guidelines page draws, so `data.ts` can stay
   plain data and reference them by key. */
export const guidelineIcons: Record<string, IconType> = {
    // Core editorial values
    accuracy: HiOutlineCheckBadge,
    honesty: HiOutlineChatBubbleLeftRight,
    integrity: HiOutlineShieldCheck,
    inclusivity: HiOutlineUserGroup,
    culture: HiOutlineGlobeAmericas,

    // How we select and feature programs
    reputation: HiOutlineClock,
    transparency: HiOutlineEye,
    safety: HiOutlineLifebuoy,
    reviews: HiOutlineStar,
    alignment: HiOutlineHandRaised,

    // Who writes for GoAbroad — the globe is already the "Respect for Culture"
    // value, so alumni get the plane instead.
    alumni: HiOutlinePaperAirplane,
    educators: HiOutlineAcademicCap,
    writers: HiOutlinePencilSquare,
    experts: HiOutlineLightBulb,
    team: HiOutlineUsers,
};

export function GuidelineIcon({
    name,
    className,
}: {
    name: string;
    className?: string;
}) {
    const Icon = guidelineIcons[name];
    if (!Icon) return null;
    return <Icon aria-hidden className={className} />;
}
