import { FiCheck } from "react-icons/fi";

export default function Stepper({
    steps,
    current,
}: {
    steps: string[];
    current: number;
}) {
    return (
        <ol className="flex items-center">
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
                        <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                state === "done"
                                    ? "bg-brand-500 text-white"
                                    : state === "active"
                                      ? "bg-brand-100 text-brand-700 ring-2 ring-brand-500"
                                      : "bg-slate-100 text-slate-400"
                            }`}
                        >
                            {state === "done" ? (
                                <FiCheck className="h-4 w-4" />
                            ) : (
                                i + 1
                            )}
                        </span>
                        <span
                            className={`ml-2 hidden text-xs font-medium sm:block ${
                                state === "todo"
                                    ? "text-slate-400"
                                    : "text-slate-700"
                            }`}
                        >
                            {s}
                        </span>
                        {i < steps.length - 1 && (
                            <span
                                className={`mx-3 h-px flex-1 ${
                                    i < current ? "bg-brand-400" : "bg-slate-200"
                                }`}
                            />
                        )}
                    </li>
                );
            })}
        </ol>
    );
}
