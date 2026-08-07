import { FiCheck } from "react-icons/fi";

export default function ProgressBar({
    steps,
    current,
}: {
    steps: string[];
    current: number;
}) {
    return (
        <ol className="mx-auto flex max-w-4xl items-start">
            {steps.map((s, i) => {
                const state =
                    i < current ? "done" : i === current ? "active" : "todo";
                return (
                    <li
                        key={s}
                        className={`flex items-center ${
                            i < steps.length - 1 ? "flex-1" : ""
                        }`}
                    >
                        <div className="flex flex-col items-center gap-1.5">
                            <span
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                                    state === "done"
                                        ? "bg-cobalt-500 text-white"
                                        : state === "active"
                                          ? "bg-cobalt-500 text-white ring-4 ring-cobalt-500/20"
                                          : "bg-slate-200 text-slate-500"
                                }`}
                            >
                                {state === "done" ? (
                                    <FiCheck className="h-4 w-4" />
                                ) : (
                                    i + 1
                                )}
                            </span>
                            <span
                                className={`hidden max-w-[80px] text-center text-[11px] font-medium leading-tight sm:block ${
                                    i <= current
                                        ? "text-cobalt-600"
                                        : "text-slate-400"
                                }`}
                            >
                                {s}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <span
                                className={`mx-2 mt-4 h-0.5 flex-1 ${
                                    i < current ? "bg-cobalt-500" : "bg-slate-200"
                                }`}
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    );
}
