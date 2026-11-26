"use client";

import { useState, type ReactNode } from "react";
import { Button } from "../../mui";
import { Checkbox } from "../../results-table/primitives/Checkbox";
import { SlideDrawer } from "../../results-table/primitives/Drawer";
import { Select } from "../../results-table/primitives/Select";
import { FormControlLabel, Switch } from "../../results-table/primitives/Switch";
import { teams } from "./query";

/* Copy of src/components/Drawer/GlobalFilterDrawer.js with the sections the
   invoice list turns on (accountStatus, createdBy, teamAssignment,
   openStatus, commentStatus), in the order the component renders them.
   A bottom drawer of #ddd-ruled cells, five to a row, each a checkbox that
   enables its switch or select; Apply / Clear sit on their own row because
   there are five sections. The drawer keeps its own state and re-reads the
   filters the container hands back (componentDidUpdate). */

export type DrawerFilters = {
    accountStatus: boolean;
    status?: boolean;
    teamAssignment: boolean;
    team?: number | string;
    createdByStatus: boolean;
    created_by?: number;
    open?: number;
    has_comment?: number;
};

export type DrawerOutput = {
    is_active: number | null;
    created_by: number | null;
    team: number | string | null;
    open: number | null;
    has_comment: number | null;
};

const CELL = "flex min-w-[140px] flex-[1_1_20%] flex-col items-center justify-center border-0 border-l border-t border-solid !border-[#ddd] px-4 py-6";

const Section = ({ children }: { children: ReactNode }) => <div className={CELL}>{children}</div>;

const initial = {
    accountStatus: false,
    status: false,
    createdByStatus: false,
    created_by: 1,
    teamAssignment: false,
    team: "" as number | string,
    openStatus: false,
    open: false,
    commentFilter: false,
    has_comment: false,
};

const GlobalFilterDrawer = ({
    open,
    filters,
    loadingData,
    onFiltersChange,
    onClose,
    onApplyFilter,
    onClearFilters,
}: {
    open: boolean;
    filters: DrawerFilters;
    loadingData?: boolean;
    onFiltersChange: (filters: DrawerOutput) => void;
    onClose: () => void;
    onApplyFilter: () => void;
    onClearFilters: () => void;
}) => {
    const [state, setState] = useState(initial);

    // componentDidUpdate: copy over every key the container sends back.
    const key = JSON.stringify(filters);
    const [prevKey, setPrevKey] = useState(key);
    if (key !== prevKey) {
        setPrevKey(key);
        setState((s) => ({
            ...s,
            accountStatus: filters.accountStatus,
            teamAssignment: filters.teamAssignment,
            createdByStatus: filters.createdByStatus,
            ...(filters.status !== undefined && { status: filters.status }),
            ...(filters.team !== undefined && { team: filters.team }),
            ...(filters.created_by !== undefined && { created_by: filters.created_by }),
            ...(filters.has_comment !== undefined && { has_comment: !!filters.has_comment }),
        }));
    }

    const map = (s: typeof state): DrawerOutput => ({
        is_active: s.accountStatus ? (s.status ? 1 : 0) : null,
        created_by: s.createdByStatus ? s.created_by : null,
        team: s.teamAssignment ? s.team : null,
        open: s.openStatus ? (s.open ? 1 : 0) : null,
        has_comment: s.commentFilter ? (s.has_comment ? 1 : 0) : null,
    });

    const change = (patch: Partial<typeof state>) => {
        const next = { ...state, ...patch };
        setState(next);
        onFiltersChange(map(next));
    };

    return (
        <SlideDrawer open={open} anchor="bottom" onClose={onClose} id="global-drawer">
            <div className="flex flex-wrap">
                <Section>
                    <div className="flex flex-row flex-wrap">
                        <FormControlLabel
                            id="account-status"
                            control={<Checkbox checked={state.accountStatus} onChange={(e) => change({ accountStatus: e.target.checked })} />}
                            label="Account Status"
                        />
                    </div>
                    <div className="flex flex-row flex-wrap">
                        <FormControlLabel
                            id="active-inactive-option"
                            disabled={!state.accountStatus}
                            control={
                                <Switch
                                    disabled={!state.accountStatus}
                                    checked={state.status}
                                    onChange={(e) => change({ status: e.target.checked })}
                                />
                            }
                            label={state.status ? "Active" : "Inactive"}
                        />
                    </div>
                </Section>
                <Section>
                    <div className="flex flex-row flex-wrap">
                        <FormControlLabel
                            id="created-by-checkbox"
                            control={
                                <Checkbox
                                    checked={state.createdByStatus}
                                    onChange={(e) => change({ createdByStatus: e.target.checked })}
                                />
                            }
                            label="Created By"
                        />
                    </div>
                    <Select
                        value={state.created_by}
                        autoWidth
                        disabled={!state.createdByStatus}
                        items={[
                            { value: 0, label: "Internal Admin" },
                            { value: 1, label: "Client Admin" },
                        ]}
                        onChange={(v) => change({ created_by: v })}
                    />
                </Section>
                <Section>
                    <div className="flex flex-row flex-wrap">
                        <FormControlLabel
                            id="team-assignment"
                            control={
                                <Checkbox
                                    checked={state.teamAssignment}
                                    onChange={(e) => change({ teamAssignment: e.target.checked })}
                                />
                            }
                            label="Team Assignment"
                        />
                    </div>
                    <Select
                        label="Team Name"
                        className="max-w-[200px]"
                        // value={team !== '' ? team : 0}
                        value={state.team !== "" ? state.team : 0}
                        autoWidth
                        disabled={!state.teamAssignment}
                        items={teams.map(({ id, name }) => ({ value: id as number | string, label: name }))}
                        onChange={(v) => change({ team: v })}
                    />
                </Section>
                <Section>
                    <div className="flex flex-row flex-wrap">
                        <FormControlLabel
                            id="open-invoice-status"
                            control={<Checkbox checked={state.openStatus} onChange={(e) => change({ openStatus: e.target.checked })} />}
                            label="Open"
                        />
                        <FormControlLabel
                            id="open-invoice-option"
                            disabled={!state.openStatus}
                            control={<Switch disabled={!state.openStatus} checked={state.open} onChange={(e) => change({ open: e.target.checked })} />}
                            label={state.open ? "Yes" : "No"}
                        />
                    </div>
                </Section>
                <Section>
                    <div className="flex flex-row flex-wrap">
                        <FormControlLabel
                            id="has-comment-status"
                            control={
                                <Checkbox checked={state.commentFilter} onChange={(e) => change({ commentFilter: e.target.checked })} />
                            }
                            label="Comments"
                        />
                        <FormControlLabel
                            id="has-comment-option"
                            disabled={!state.commentFilter}
                            control={
                                <Switch
                                    disabled={!state.commentFilter}
                                    checked={state.has_comment}
                                    onChange={(e) => change({ has_comment: e.target.checked })}
                                />
                            }
                            label={state.has_comment ? "With Comments" : "Without Comments"}
                        />
                    </div>
                </Section>
                <div
                    id="closeButton"
                    className="flex max-w-none flex-[1_1_100%] flex-row items-center justify-end border-0 border-t border-solid !border-[#ddd] px-6 py-4 [&>button]:mx-2 [&>button]:my-1 [&>button]:min-w-[120px]"
                >
                    <Button
                        data-cy="apply-global-filter"
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={onApplyFilter}
                        disabled={loadingData}
                    >
                        Apply
                    </Button>
                    <Button
                        data-cy="clear-global-filter"
                        id="clear-button"
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => {
                            setState({ ...initial, open: false });
                            onClearFilters();
                        }}
                        disabled={loadingData}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </SlideDrawer>
    );
};

export default GlobalFilterDrawer;
