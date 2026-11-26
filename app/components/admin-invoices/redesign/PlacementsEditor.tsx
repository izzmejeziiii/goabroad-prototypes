"use client";

import clsx from "clsx";
import { Check, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { money } from "../format";
import { DIRECTORIES, LOCATIONS, directoryName, timingsFor, typesFor } from "../staff/editor/catalog";
import { useDraft } from "./DraftContext";
import { lineTotal, product, type DraftItem, type DraftPlacement } from "./draft";
import { useCompact } from "./density";
import LocationPicker from "./LocationPicker";
import { DiscountInput } from "./sections";
import { Select, buttonPrimary, errorText, label } from "./ui";

/* The placements of the item being edited.

   Adding: one "Add placements" panel. Same rule as the real editor's
   placement drawer: Type, Timing and Location are all optional, and a
   placement can be added once any one of them is set. Tick several
   locations to add them in one go ("Add 3 placements"); with none ticked,
   one placement is added for the type and timing. Like the real drawer it
   doesn't stop a repeat; locations already on the item are marked "Added"
   in the list so a repeat is easy to spot.

   The list: each placement is a readable row (where it shows, its amount,
   its discount, its total) with a pencil to change it and a red trash to
   remove it. Only the row being changed turns into fields.

   Products whose Ad Placement is "None" (e.g. Premier Sponsorship) don't
   use this at all: ItemEdit hides the section and shows their discount
   beside the price. */

const LOCATION_NAMES = LOCATIONS.map((l) => l.name);

const COLS = "grid-cols-[minmax(0,1fr)_6rem_7rem_6.5rem_5rem]";

const withCurrent = (list: { name: string }[], current: string) =>
    current && !list.some((o) => o.name === current) ? [{ name: current }, ...list] : list;

const describe = (p: DraftPlacement) => ({
    // Every field is optional, as in the real editor
    where: p.location || "Any location",
    what: [p.type || "Any type", p.timing || "Any timing"].join(" · "),
});

type Fields = Pick<DraftPlacement, "location" | "type" | "timing">;

/** The three fields, for the row being changed. */
const RowFields = ({ dir, value, onChange }: { dir: number; value: Fields; onChange: (v: Fields) => void }) => (
    <div className="grid min-w-0 grid-cols-3 gap-1.5 [&_select]:!pl-2.5 [&_select]:!pr-7">
        <Select aria-label="Location" value={value.location} onChange={(e) => onChange({ ...value, location: e.target.value })}>
            <option value="">Any location</option>
            {withCurrent(LOCATIONS, value.location).map((o) => (
                <option key={o.name}>{o.name}</option>
            ))}
        </Select>
        <Select aria-label="Type" value={value.type} onChange={(e) => onChange({ ...value, type: e.target.value })}>
            <option value="">Any type</option>
            {withCurrent(typesFor(dir), value.type).map((o) => (
                <option key={o.name}>{o.name}</option>
            ))}
        </Select>
        <Select aria-label="Timing" value={value.timing} onChange={(e) => onChange({ ...value, timing: e.target.value })}>
            <option value="">Any timing</option>
            {withCurrent(timingsFor(dir), value.timing).map((o) => (
                <option key={o.name}>{o.name}</option>
            ))}
        </Select>
    </div>
);

const PlacementsEditor = ({ item }: { item: DraftItem }) => {
    const { addPlacement, updatePlacement, removePlacement, problems, showErrors } = useDraft();
    const dir = product(item.productId)?.directory_id ?? DIRECTORIES[0].id;
    // null = the directory's own type, the starting choice; "" = any type
    const [type, setType] = useState<string | null>(null);
    const [timing, setTiming] = useState("");
    const [locations, setLocations] = useState<string[]>([]);
    const [editing, setEditing] = useState<{ id: string; before: Fields } | null>(null);
    const compact = useCompact();

    const addType = type ?? directoryName(dir);
    const taken = new Set(item.placements.filter((p) => p.type === addType && p.timing === timing).map((p) => p.location));
    // Ticked locations become one placement each; none ticked adds one
    // placement without a location (the real drawer's Location is optional)
    const toAdd = locations.length ? locations : [""];
    // The real "Save Placement" needs any one of location, timing or type
    const anything = locations.length > 0 || !!timing || !!addType;
    const canAdd = !!item.productId && anything;
    const addLabel = locations.length > 1 ? `Add ${locations.length} placements` : "Add placement";

    const add = () => {
        if (!canAdd) return;
        toAdd.forEach((location) => addPlacement(item.id, { location, type: addType, timing }));
        setLocations([]);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className={label}>
                    Placements <span className="font-normal normal-case tracking-normal text-slate-400">· {item.placements.length}</span>
                </h3>
                <p className="text-xs text-slate-500">{item.placements.length > 0 && `${money(item.unitPrice)} per placement`}</p>
            </div>

            {/* Add placements */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                {item.productId ? (
                    // One row; compact: Type | Timing over Locations, then Add
                    <div
                        className={clsx(
                            "grid items-end gap-3",
                            compact ? "grid-cols-2" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.4fr)_auto]",
                        )}
                    >
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-slate-600">Type</span>
                            <Select value={addType} onChange={(e) => setType(e.target.value)}>
                                <option value="">Any type</option>
                                {withCurrent(typesFor(dir), addType).map((o) => (
                                    <option key={o.name}>{o.name}</option>
                                ))}
                            </Select>
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-slate-600">Timing</span>
                            <Select value={timing} onChange={(e) => setTiming(e.target.value)}>
                                <option value="">Any timing</option>
                                {timingsFor(dir).map((o) => (
                                    <option key={o.name}>{o.name}</option>
                                ))}
                            </Select>
                        </label>
                        <div className={clsx("flex flex-col gap-1.5", compact && "col-span-2")}>
                            <span className="text-xs font-medium text-slate-600">
                                Locations <span className="font-normal text-slate-500">· optional, pick one or more</span>
                            </span>
                            <LocationPicker options={LOCATION_NAMES} value={locations} onChange={setLocations} taken={taken} />
                        </div>
                        <button
                            type="button"
                            className={clsx(
                                buttonPrimary,
                                "!bg-cobalt-500 !px-4 !py-2 hover:!bg-cobalt-600",
                                compact && "col-span-2 justify-self-end",
                            )}
                            disabled={!canAdd}
                            onClick={add}
                            title={!anything ? "Choose a type, timing or location" : undefined}
                        >
                            <Plus className="size-4" /> {addLabel}
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-slate-500">Choose a product first, then add where it shows.</p>
                )}
            </div>

            {/* The list, once the first placement is added */}
            {item.placements.length > 0 && (
                <div>
                    <div className={clsx("grid items-center gap-3 border-b border-slate-200 pb-2", COLS)}>
                        <span className={label}>Where it shows</span>
                        <span className={clsx(label, "text-right")}>Amount</span>
                        <span className={clsx(label, "text-right")}>Discount</span>
                        <span className={clsx(label, "text-right")}>Total</span>
                        <span />
                    </div>

                    {
                        <ul className="flex flex-col divide-y divide-slate-100">
                            {item.placements.map((p) => {
                                const isEditing = editing?.id === p.id;
                                const { where, what } = describe(p);
                                const error = showErrors ? problems.placements[p.id] : undefined;
                                return (
                                    <li key={p.id} className={clsx("grid items-center gap-3 py-2.5", COLS, isEditing && "bg-cobalt-500/[0.03]")}>
                                        {isEditing ? (
                                            <RowFields dir={dir} value={p} onChange={(v) => updatePlacement(item.id, p.id, v)} />
                                        ) : (
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                                                    <MapPin className="size-4" />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block truncate text-sm font-medium text-slate-900">{where}</span>
                                                    <span className="block truncate text-xs text-slate-500">{what}</span>
                                                    {error && <span className={clsx(errorText, "block")}>{error}</span>}
                                                </span>
                                            </div>
                                        )}
                                        <span className="text-right text-sm tabular-nums text-slate-500">{money(item.unitPrice)}</span>
                                        <DiscountInput item={item} placement={p} />
                                        <span className="text-right text-sm font-semibold tabular-nums text-slate-900">
                                            {money(lineTotal(item, p))}
                                        </span>
                                        <div className="flex justify-end gap-1">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        aria-label="Save placement"
                                                        title="Save"
                                                        onClick={() => setEditing(null)}
                                                        className="inline-flex size-8 items-center justify-center rounded-md text-fern-700 transition-colors hover:bg-fern-200/40"
                                                    >
                                                        <Check className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        aria-label="Cancel changes"
                                                        title="Cancel"
                                                        onClick={() => {
                                                            if (editing) updatePlacement(item.id, p.id, editing.before);
                                                            setEditing(null);
                                                        }}
                                                        className="inline-flex size-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100"
                                                    >
                                                        <X className="size-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        type="button"
                                                        aria-label={`Change ${where}`}
                                                        title="Change placement"
                                                        onClick={() =>
                                                            setEditing({ id: p.id, before: { location: p.location, type: p.type, timing: p.timing } })
                                                        }
                                                        className="inline-flex size-8 items-center justify-center rounded-md text-cobalt-500 transition-colors hover:bg-cobalt-500/10"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${where}`}
                                                        title="Remove placement"
                                                        onClick={() => removePlacement(item.id, p.id)}
                                                        className="inline-flex size-8 items-center justify-center rounded-md text-red-600 transition-colors hover:bg-red-50"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    }
                </div>
            )}
        </div>
    );
};

export default PlacementsEditor;
