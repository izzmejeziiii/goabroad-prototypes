import type { IconType } from "react-icons";
import {
    HiOutlineAcademicCap,
    HiOutlineBookOpen,
    HiOutlineBriefcase,
    HiOutlineBuildingLibrary,
    HiOutlineBuildingOffice2,
    HiOutlineChatBubbleLeftRight,
    HiOutlineDocumentCheck,
    HiOutlineGlobeAmericas,
    HiOutlineHeart,
    HiOutlineLanguage,
    HiOutlineMap,
} from "react-icons/hi2";

/* One icon per program directory, keyed the way `data.ts` refers to them, so
   the data can stay plain. */
export const directoryIcons: Record<string, IconType> = {
    "study-abroad": HiOutlineAcademicCap,
    "intern-abroad": HiOutlineBriefcase,
    "volunteer-abroad": HiOutlineHeart,
    "tefl-courses": HiOutlineDocumentCheck,
    "high-school-abroad": HiOutlineBookOpen,
    "teach-abroad": HiOutlineChatBubbleLeftRight,
    "gap-year": HiOutlineMap,
    "language-schools": HiOutlineLanguage,
    "degree-abroad": HiOutlineBuildingLibrary,
    "adventure-travel": HiOutlineGlobeAmericas,
    "jobs-abroad": HiOutlineBuildingOffice2,
};

export function DirectoryIcon({
    name,
    className,
}: {
    name: string;
    className?: string;
}) {
    const Icon = directoryIcons[name];
    if (!Icon) return null;
    return <Icon aria-hidden className={className} />;
}
