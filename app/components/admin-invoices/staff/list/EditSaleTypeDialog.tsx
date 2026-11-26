"use client";

import { DialogBox } from "../../results-table/primitives/DialogBox";
import { Select } from "../../results-table/primitives/Select";
import { SALE_TYPE_VALUE } from "./constants";

/* ResultsMain's "Edit Sale Type" dialog: the title, a full-width standard
   Select labelled "Sale Type", and Save / Cancel. */
const EditSaleTypeDialog = ({
    open,
    value,
    onChange,
    onSave,
    onCancel,
}: {
    open: boolean;
    value: number | string | null;
    onChange: (value: number | string) => void;
    onSave: () => void;
    onCancel: () => void;
}) => (
    <DialogBox
        actions="OkCancel"
        open={open}
        onOk={onSave}
        onCancel={onCancel}
        onClose={onCancel}
        stringOverride={{ primaryAction: "Save", secondaryAction: "Cancel" }}
    >
        <p className="m-0 text-[1.25rem] font-semibold leading-[1.5] tracking-[0.00938em] text-[#424242]">Edit Sale Type</p>
        <div className="mt-4 flex-auto overflow-y-auto p-0">
            <Select
                label="Sale Type"
                className="w-full"
                rootClassName="w-full"
                value={value ?? ""}
                items={SALE_TYPE_VALUE.map((o) => ({ value: o.id, label: o.name }))}
                onChange={onChange}
            />
        </div>
    </DialogBox>
);

export default EditSaleTypeDialog;
