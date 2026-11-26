import { today } from "../../format";
import type { Duration, EditorDate } from "./types";

/* The helpers the editor imports from src/utilities/extract.js,
   src/utilities/dateFormatter.js and src/helpers/dataUtility.js, as they
   are. "Now" is the prototype's DEMO_TODAY wherever the source used
   new Date() for a calendar date. */

/** extract.js decimalAdjust. */
export const decimalAdjust = (type: "round" | "floor" | "ceil", value: number | string, exp: number) => {
    if (!exp) return Math[type](Number(value));
    const n = +value;
    if (isNaN(n)) return NaN;
    let parts = n.toString().split("e");
    const shifted = Math[type](+(parts[0] + "e" + (parts[1] ? +parts[1] - exp : -exp)));
    parts = shifted.toString().split("e");
    return +(parts[0] + "e" + (parts[1] ? +parts[1] + exp : exp));
};

/** extract.js transformNumberToTwoDecimalFloat. */
export const round2 = (n: number | string) => decimalAdjust("round", n, -2);

/** extract.js getNumber: a leading non-digit is read as "$" (so "-5" is 5). */
export const getNumber = (value: number | string = "") => {
    const string = value.toString();
    if (isNaN(Number(string[0]))) return { type: "dollar", value: parseFloat(string.slice(1)) };
    if (isNaN(Number(string[string.length - 1])))
        return { type: "percent", value: parseFloat(string.slice(0, string.length - 1)) };
    return { type: "dollar", value: parseFloat(string) };
};

/** dataUtility.js isEmptyDate. */
export const isEmptyDate = (date: unknown) =>
    ["0000-00-00 00:00:00", "0000-00-00", "null", "", undefined, null].includes(
        date as string | null | undefined,
    );

/** A usable Date from any EditorDate, or null. Strings read as local time. */
export const toDate = (value: EditorDate | undefined): Date | null => {
    if (value === null || value === undefined || value === "") return null;
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
    if (typeof value === "number") return new Date(value);
    if (isEmptyDate(value)) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):?(\d{2})?)?/.exec(value);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0), +(m[6] ?? 0));
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

/** dateFormatter.js dateFormatter: "yyyy-MM-dd" or "yyyy-MM-dd HH:mm:ss". */
export const dateFormatter = (date: EditorDate | undefined, type?: "datetime") => {
    const d = toDate(date);
    if (!d) return "";
    const ymd = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return type === "datetime"
        ? `${ymd} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
        : ymd;
};

/** date-fns 'MM/dd/yyyy' (react-datepicker's default dateFormat). */
export const formatMDY = (date: EditorDate | undefined) => {
    const d = toDate(date);
    return d ? `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}` : "";
};

/** dateFormatter.js addBusinessDays (skips weekends). */
export const addBusinessDays = (startDate: EditorDate, daysToAdd: number) => {
    const result = new Date(toDate(startDate) ?? today());
    let added = 0;
    while (added < daysToAdd) {
        result.setDate(result.getDate() + 1);
        const day = result.getDay();
        if (day !== 0 && day !== 6) added++;
    }
    return result;
};

const lastDayOf = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

/** dateFormatter.js computeEndDate. Returns a timestamp for month/day/year
    (Date#setDate's return value) and a Date otherwise, like the source. */
export const computeEndDate = (date: EditorDate, duration: Partial<Duration> = {}): Date | number => {
    // new Date(null) is the epoch, as in the source.
    const d = new Date(date === null ? 0 : (toDate(date) ?? today()));
    const { type } = duration;
    const n = parseInt(String(duration.value));
    if (type === "month") {
        const startDay = d.getDate();
        const targetMonth = d.getMonth() + n;
        const lastDayOfStart = lastDayOf(d.getFullYear(), d.getMonth());
        const lastDayOfTarget = lastDayOf(d.getFullYear(), targetMonth);
        const endDay =
            (startDay === lastDayOfStart ? lastDayOfTarget : Math.min(startDay, lastDayOfTarget)) - 1;
        d.setDate(1);
        d.setMonth(targetMonth);
        return d.setDate(endDay);
    }
    if (type === "day") return d.setDate(d.getDate() + n - 1);
    if (type === "year") {
        const startDay = d.getDate();
        const targetYear = d.getFullYear() + n;
        const lastDayOfTarget = lastDayOf(targetYear, d.getMonth());
        d.setDate(1);
        d.setFullYear(targetYear);
        return d.setDate(Math.min(startDay, lastDayOfTarget) - 1);
    }
    return d;
};

/** dateFormatter.js isOverdue: before today's midnight. */
export const isOverdue = (date: EditorDate) => {
    const given = toDate(date);
    if (!given) return false;
    return given < today();
};

/** InvoiceCTAs / PaymentTermDetails compareDates: date1 < date2 on the
    UTC calendar day. */
export const compareDates = (a: EditorDate, b: EditorDate) => {
    // new Date(null) is the epoch; new Date('') is invalid (never smaller).
    const d1 = toDate(a) ?? new Date(a === null ? 0 : NaN);
    const d2 = toDate(b) ?? new Date(b === null ? 0 : NaN);
    const u1 = Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
    const u2 = Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate());
    return u1 < u2;
};

/** `n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')`, no "$". */
export const commas = (n: number) => (Number(n) || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

/** date-fns formatDistanceToNow(date, { addSuffix: true }) (Comment card). */
export const distanceToNow = (value: EditorDate) => {
    const date = toDate(value);
    if (!date) return "";
    const diff = Date.now() - date.getTime();
    const minutes = Math.round(Math.abs(diff) / 60000);
    const months = Math.round(minutes / 43200);
    let text: string;
    if (minutes < 1) text = "less than a minute";
    else if (minutes < 45) text = minutes === 1 ? "1 minute" : `${minutes} minutes`;
    else if (minutes < 90) text = "about 1 hour";
    else if (minutes < 1440) text = `about ${Math.round(minutes / 60)} hours`;
    else if (minutes < 2520) text = "1 day";
    else if (minutes < 43200) text = `${Math.round(minutes / 1440)} days`;
    else if (minutes < 86400) text = months <= 1 ? "about 1 month" : `about ${months} months`;
    else if (months < 12) text = `${months} months`;
    else {
        const years = Math.floor(months / 12);
        const rest = months % 12;
        if (rest < 3) text = `about ${years} year${years > 1 ? "s" : ""}`;
        else if (rest < 9) text = `over ${years} year${years > 1 ? "s" : ""}`;
        else text = `almost ${years + 1} years`;
    }
    return diff >= 0 ? `${text} ago` : `in ${text}`;
};
