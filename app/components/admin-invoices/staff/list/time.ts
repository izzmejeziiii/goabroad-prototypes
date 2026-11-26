import { DEMO_TODAY } from "../../data";
import { parseDate } from "../../format";

/* date-fns' formatDistanceToNow (en-US, addSuffix) and the admin's
   relativeDateFormatter / absoluteDateFormatter, measured from the demo
   day at the current clock time so "2 days ago" stays put. */

export const demoNow = () => {
    const n = new Date();
    const d = parseDate(DEMO_TODAY) as Date;
    d.setHours(n.getHours(), n.getMinutes(), n.getSeconds());
    return d;
};

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many.replace("{{count}}", String(n)));

export const formatDistanceToNow = (value: string) => {
    const date = parseDate(value);
    if (!date) return "";
    const now = demoNow();
    const future = date > now;
    const minutes = Math.round(Math.abs(now.getTime() - date.getTime()) / 60000);
    let text: string;
    if (minutes < 2) text = minutes === 0 ? "less than a minute" : plural(minutes, "1 minute", "{{count}} minutes");
    else if (minutes < 45) text = `${minutes} minutes`;
    else if (minutes < 90) text = "about 1 hour";
    else if (minutes < 1440) text = plural(Math.round(minutes / 60), "about 1 hour", "about {{count}} hours");
    else if (minutes < 2520) text = "1 day";
    else if (minutes < 43200) text = plural(Math.round(minutes / 1440), "1 day", "{{count}} days");
    else if (minutes < 86400) text = plural(Math.round(minutes / 43200), "about 1 month", "about {{count}} months");
    else if (minutes < 525600) text = plural(Math.round(minutes / 43200), "1 month", "{{count}} months");
    else {
        const years = Math.floor(minutes / 525600);
        const rest = minutes % 525600;
        text =
            rest < 131400
                ? plural(years, "about 1 year", "about {{count}} years")
                : rest < 394200
                  ? plural(years, "over 1 year", "over {{count}} years")
                  : plural(years + 1, "almost 1 year", "almost {{count}} years");
    }
    return future ? `in ${text}` : `${text} ago`;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

/** 'MMM dd, yyyy hh:mm a' */
export const absoluteDateFormatter = (value: string) => {
    const d = parseDate(value);
    if (!d) return "";
    const h = d.getHours() % 12 || 12;
    return `${MONTHS[d.getMonth()]} ${pad(d.getDate())}, ${d.getFullYear()} ${pad(h)}:${pad(d.getMinutes())} ${d.getHours() < 12 ? "AM" : "PM"}`;
};

/** Relative under a week, the absolute date after. */
export const relativeDateFormatter = (value: string) => {
    const d = parseDate(value);
    if (!d) return "";
    const days = Math.floor((demoNow().getTime() - d.getTime()) / 86400000);
    return days >= 7 ? absoluteDateFormatter(value) : formatDistanceToNow(value);
};
