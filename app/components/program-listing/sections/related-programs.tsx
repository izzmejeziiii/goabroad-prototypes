export const RelatedPrograms = () => (
    <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
            <h2 className="font-bold text-2xl">
                Related Programs{" "}
                <span className="text-xs font-normal italic">
                    (Related programs will appear here)
                </span>
            </h2>
            <p className="text-sm">Browse more programs you might like</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="flex flex-col rounded-md overflow-hidden shadow-md"
                >
                    <div className="relative w-full h-[175px] bg-gray-200">
                        <div className="absolute top-2 right-2 rounded-md bg-white/90 px-2 py-1 text-xs font-bold">
                            From $295
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 h-[240px] rounded-b-md relative flex flex-col">
                        <div className="absolute h-14 w-14 bg-white shadow-md rounded-md right-4 -top-[30px] flex items-center justify-center text-xs font-bold">
                            Logo
                        </div>
                        <div className="mb-3">
                            <span className="text-xs text-slate-500">
                                by Provider Name
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 mb-2">
                            <h3 className="font-bold leading-tight">
                                Volunteer in Wildlife Conservation, Bali
                            </h3>
                            <p className="text-xs text-slate-600 line-clamp-3">
                                Help protect endangered species while
                                experiencing the natural beauty of Bali. Work
                                alongside passionate conservationists.
                            </p>
                        </div>
                        <div className="flex gap-2 mt-auto items-end">
                            <button className="w-full h-[40px] bg-cobalt-500 text-white rounded-md text-sm font-bold">
                                Inquire
                            </button>
                            <button className="w-full h-[40px] border border-cobalt-500 text-cobalt-500 rounded-md text-sm font-bold">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
