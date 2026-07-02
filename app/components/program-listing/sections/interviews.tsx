export const Interviews = () => (
    <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-1">
            <h2 className="font-bold text-2xl">
                Interviews{" "}
                <span className="text-xs font-normal italic">
                    (Interviews will appear here)
                </span>
            </h2>
            <p className="text-sm">Read interviews from alumni or staff</p>
        </div>
        <div className="flex gap-8 border-y border-slate-200 py-4">
            <div className="max-w-[300px] w-full shrink-0 bg-slate-50 p-4 rounded-md flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold">Emma Watson</div>
                        <div className="text-xs text-slate-500">Alumni</div>
                        <span className="bg-cobalt-500 text-white text-xs rounded-md px-2 py-1 w-fit">
                            2024
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-600">
                    <p>
                        &ldquo;The 12 weeks I spent volunteering changed my
                        perspective on so many things...&rdquo;
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <h3 className="text-xl font-bold">
                    A Life-Changing Experience in Costa Rica
                </h3>
                <div className="flex flex-col gap-2 text-sm text-slate-700">
                    <p>
                        Emma shares her experience volunteering at a wildlife
                        sanctuary, the people she met, and the lessons that
                        stayed with her long after returning home.
                    </p>
                    <p>
                        From the moment she arrived, she was struck by the
                        warmth of the local community and the genuine impact of
                        the conservation work.
                    </p>
                </div>
                <button className="w-fit mt-2 text-cobalt-500 font-bold text-sm underline">
                    Read full interview
                </button>
            </div>
        </div>
    </div>
);
