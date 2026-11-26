import { Paper } from "../../mui";

/* Copy of src/components/Drawer/Communications.js for the drawer's Comm Logs
   tab. The demo data has no communication logs (GET
   /communication-logs/:provider_id), so this is the component's empty
   state, word for word. */
const Communications = () => (
    <Paper className="mb-6 min-w-[275px] overflow-visible p-6 [&>span]:m-0">
        <div className="text-center text-[rgba(0,0,0,0.54)]">No communications found.</div>
    </Paper>
);

export default Communications;
