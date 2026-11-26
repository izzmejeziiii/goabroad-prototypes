import clsx from "clsx";

/* The tab strip of src/views/Client/Client.js (Clients › Accounts, Invoices,
   Programs, Ads, Reviews, Communications), with Invoices selected. Tabs are
   LinkTabs (anchors), pink when selected over a #e8e8e8 rule, 0.9rem
   regular, 32px apart. Only Invoices is built here, so the others are
   drawn but go nowhere; as anchors they still pick up CssBaseline's
   a:hover colour (lightBlue 700) on hover, like the real ones. */

const clientViews = [
    { url: "client-accounts", name: "Accounts" },
    { url: "client-accounts/invoices", name: "Invoices" },
    { url: "client-accounts/programs", name: "Programs" },
    { url: "client-accounts/ads", name: "Ads" },
    { url: "client-accounts/reviews", name: "Reviews" },
    { url: "client-accounts/communication-logs", name: "Communications" },
];

const ClientTabs = ({ selected = 1 }: { selected?: number }) => (
    <div className="mb-8 flex min-h-12 overflow-hidden border-0 border-b border-solid !border-[#e8e8e8]">
        <div role="tablist" className="relative inline-block flex-auto overflow-x-hidden whitespace-nowrap">
            <div className="flex">
                {clientViews.map(({ name }, i) => (
                    <a
                        key={name}
                        role="tab"
                        aria-selected={i === selected}
                        data-cy={`tabs-${name}`}
                        className={clsx(
                            "relative mr-8 inline-flex min-h-12 min-w-[72px] max-w-[360px] shrink-0 cursor-pointer select-none items-center justify-center overflow-hidden whitespace-normal px-4 py-3 text-center text-[0.9rem] font-normal normal-case leading-[1.25] tracking-[0.02857em] !no-underline",
                            i === selected ? "!text-[#e91e63]" : "text-[rgba(0,0,0,0.6)] hover:text-[#0288d1]",
                        )}
                    >
                        {name}
                        {i === selected && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#e91e63]" />}
                    </a>
                ))}
            </div>
        </div>
    </div>
);

export default ClientTabs;
