"use client";

/* Copies src/components/Placement/PlacementDrawer.js and
   PlacementItemDropdown.js: a 420px right drawer (invisible backdrop) with
   Location / Timing / Type dropdowns, each on its own Paper, and an
   outlined "Save Placement" button. Saving keeps the drawer open and
   clears it, so several placements can be added in a row. Types and
   timings follow the item's directory (none without an item type). */

import clsx from "clsx";
import { useState } from "react";
import { Button, OVERLINE, Paper } from "../../mui";
import { LOCATIONS, ONLINE, timingsFor, typesFor } from "./catalog";
import type { Crit, EditorPlacement } from "./types";
import { Checkbox, FormControlLabel, RightDrawer } from "./ui/controls";
import { ReactSelect, type RSOption } from "./ui/ReactSelect";

type Field = "location" | "timing" | "type";

type Props = {
    storePlacement: (placement: EditorPlacement) => void;
    placementDrawerOpen: boolean;
    handleOnClose: () => void;
    directory: number;
    location: RSOption | null;
    type: RSOption | null;
    timing: RSOption | null;
    online: number | null;
};

const PlacementItemDropdown = ({
    value,
    items,
    onChange,
}: {
    value: RSOption | null;
    items: RSOption[];
    onChange: (value: RSOption | null) => void;
}) => (
    <Paper className="mb-6 flex py-4 pl-4 pr-6">
        <ReactSelect className="w-full" value={value} onChange={onChange} options={items} isClearable loadTimeout={0} />
    </Paper>
);

/** The drawer body; remounted (key) whenever what it edits changes, which
    is when componentWillReceiveProps re-synced it from its props. */
const DrawerBody = ({ storePlacement, directory, online, ...initial }: Omit<Props, "placementDrawerOpen" | "handleOnClose">) => {
    const lists: Record<Field, Crit[]> = {
        location: online === 1 ? [] : LOCATIONS,
        timing: timingsFor(directory),
        type: typesFor(directory),
    };
    const getPlacementValue = (field: Field, value: RSOption | null) =>
        value ? (lists[field].find((element) => element.id === value.value) ?? null) : null;

    const [values, setValues] = useState<Record<Field, RSOption | null>>({
        location: initial.location,
        timing: initial.timing,
        type: initial.type,
    });

    const handlePlacementChange = (field: Field) => (value: RSOption | null) =>
        setValues((prev) => ({ ...prev, [field]: value }));

    const handleAddPlacement = () => {
        const placement = {
            location: getPlacementValue("location", values.location),
            timing: getPlacementValue("timing", values.timing),
            type: getPlacementValue("type", values.type),
            online: online === 1 ? ONLINE : null,
        };
        setValues({ location: null, timing: null, type: null });
        storePlacement(placement);
    };

    const options = (field: Field) => lists[field].map((a) => ({ label: a.name, value: a.id }));
    const label = clsx(OVERLINE, "block");

    return (
        <div className="box-border flex h-full w-[420px] flex-col justify-between p-6">
            <div data-cy="placement-drawer">
                {!!lists.location.length && (
                    <div>
                        <span className={label}>Location</span>
                        <PlacementItemDropdown
                            value={values.location}
                            items={options("location")}
                            onChange={handlePlacementChange("location")}
                        />
                    </div>
                )}
                {!!lists.timing.length && (
                    <div>
                        <span className={label}>Timing</span>
                        <PlacementItemDropdown
                            value={values.timing}
                            items={options("timing")}
                            onChange={handlePlacementChange("timing")}
                        />
                    </div>
                )}
                {!!lists.type.length && (
                    <div>
                        <span className={label}>Type</span>
                        <PlacementItemDropdown
                            value={values.type}
                            items={options("type")}
                            onChange={handlePlacementChange("type")}
                        />
                    </div>
                )}
                {online === 1 && (
                    <div>
                        <FormControlLabel control={<Checkbox checked disabled />} label="Online" disabled />
                    </div>
                )}
                <Button
                    data-cy="save-placement-button"
                    onClick={handleAddPlacement}
                    disabled={!(values.location || values.timing || values.type || online)}
                    variant="outlined"
                    size="medium"
                    color="primary"
                    fullWidth
                >
                    Save Placement
                </Button>
            </div>
        </div>
    );
};

const PlacementDrawer = ({ placementDrawerOpen, handleOnClose, ...props }: Props) => (
    <RightDrawer open={placementDrawerOpen} onClose={handleOnClose}>
        <DrawerBody
            key={`${props.directory}|${JSON.stringify([props.location, props.timing, props.type])}`}
            {...props}
        />
    </RightDrawer>
);

export default PlacementDrawer;
