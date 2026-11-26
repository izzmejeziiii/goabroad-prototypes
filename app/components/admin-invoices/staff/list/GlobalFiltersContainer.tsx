"use client";

import { useState } from "react";
import { useInvoicesContext } from "./InvoicesProvider";
import GlobalFilterDrawer, { type DrawerFilters, type DrawerOutput } from "./GlobalFilterDrawer";
import { GLOBAL_FILTER_NAMES, hasValue, type StaffFilters } from "./constants";

/* Copy of src/views/Client/Invoices/GlobalFiltersContainer.js: buffers the
   drawer's choices and applies them on Apply (the drawer stays open), or
   clears them on Clear; closing the drawer drops what wasn't applied.
   Kept quirks:
   - every change also sets provider_id to null, so applying global filters
     drops the Client Name column filter;
   - ticking Team Assignment before picking a team maps the empty team to
     the padded team list's first entry, an object, which the select can't
     show (it goes blank) and which reaches the API as "[object Object]"
     once another change re-sends it, matching no invoice. */

/** What `${teams[0]}` turns into on the way to the query string. */
const OBJECT_TEAM = "[object Object]";

const mapFilters = (filters: StaffFilters): DrawerFilters => {
    const { team_id = null, is_active = null, has_comment = null, source = null } = filters;
    const out: DrawerFilters = { accountStatus: false, teamAssignment: false, createdByStatus: false };
    if (hasValue(is_active)) {
        out.status = is_active === 1;
        out.accountStatus = true;
    }
    if (team_id !== null) {
        out.team = team_id === "" ? OBJECT_TEAM : team_id;
        out.teamAssignment = true;
    }
    if (has_comment !== null) out.has_comment = has_comment;
    if (hasValue(source)) {
        out.created_by = Number(source);
        out.createdByStatus = true;
    }
    return out;
};

const GlobalFiltersContainer = () => {
    const { state, handleStateChanged } = useInvoicesContext();
    const { filters, prevFilters, globalFilterOpen } = state;
    const [bufferFilters, setBufferFilters] = useState<StaffFilters>({});

    const apply = () => {
        const newFilters = { ...filters, ...bufferFilters };
        const changed = !GLOBAL_FILTER_NAMES.every((f) => newFilters[f] === prevFilters[f]);
        if (changed) handleStateChanged({ filters: newFilters, page: 0, prevFilters: { ...newFilters } });
    };

    const clear = () => {
        const changed = !GLOBAL_FILTER_NAMES.every((f) => !hasValue(filters[f]));
        if (changed) {
            const next = { ...filters, is_active: null, team_id: null, open: null, has_comment: null, source: null };
            setBufferFilters({});
            handleStateChanged({ filters: next, prevFilters: { ...next }, page: 0 });
        }
    };

    const change = (f: DrawerOutput) =>
        setBufferFilters({
            is_active: f.is_active,
            team_id: f.team,
            provider_id: null,
            open: f.open,
            has_comment: f.has_comment,
            source: f.created_by,
        });

    return (
        <GlobalFilterDrawer
            open={globalFilterOpen}
            filters={mapFilters(bufferFilters)}
            onFiltersChange={change}
            onClose={() => {
                setBufferFilters(filters);
                handleStateChanged({ globalFilterOpen: false });
            }}
            onApplyFilter={apply}
            onClearFilters={clear}
        />
    );
};

export default GlobalFiltersContainer;
