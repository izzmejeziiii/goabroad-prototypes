/* date-fns-style formats the client admin uses, without the dependency.
   Dates in data.ts are local ISO strings ("2026-11-12T09:41:00"). */

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const parse = (iso: string) => {
    const [date] = iso.split("T");
    const [y, m, d] = date.split("-").map(Number);
    return { y, m, d };
};

const pad = (n: number) => String(n).padStart(2, "0");

/** "MMM d, yyyy" → "Nov 12, 2026" (Latest Leads). */
export const formatShort = (iso: string) => {
    const { y, m, d } = parse(iso);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
};

/** "MM/dd/yyyy" → "11/12/2026" (Leads table and drawer). */
export const formatNumeric = (iso: string) => {
    const { y, m, d } = parse(iso);
    return `${pad(m)}/${pad(d)}/${y}`;
};
