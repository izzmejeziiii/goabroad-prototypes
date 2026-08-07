/** Join class names, dropping falsy values. Stands in for the source app's
 *  clsx + tailwind-merge `cn`, which this prototype doesn't ship. */
export function cn(...inputs: (string | false | null | undefined)[]): string {
    return inputs.filter(Boolean).join(" ");
}

/** Compute days remaining from an end date string. */
export function daysLeft(endDate: string): number {
    const diff = new Date(endDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

export function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
