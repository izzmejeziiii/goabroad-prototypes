import Card from "../shared/Card";
import { salesCollections } from "../staff-data";

function Bar({
    label,
    actual,
    goal,
    color,
}: {
    label: string;
    actual: number;
    goal: number;
    color: string;
}) {
    const pct = Math.round((actual / goal) * 100);
    return (
        <div>
            <div className="mb-1 flex justify-between text-xs">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-700">
                    ${Math.round(actual / 1000)}k / ${Math.round(goal / 1000)}k ·{" "}
                    {pct}%
                </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.min(pct, 100)}%`, background: color }}
                />
            </div>
        </div>
    );
}

export default function SalesProgress() {
    const { sales, collections, year, month, quarter } = salesCollections;
    return (
        <Card title="Sales & Collections Progress">
            <p className="-mt-1 mb-4 text-sm text-slate-500">
                {year} · YTD through {month} · Q{quarter} QTD · vs goal
            </p>
            <div className="space-y-5">
                <div>
                    <div className="mb-2 text-sm font-semibold text-slate-700">
                        Sales
                    </div>
                    <div className="space-y-3">
                        <Bar label="YTD · annual goal" actual={sales.ytdActual} goal={sales.ytdGoal} color="#295d82" />
                        <Bar label={`Q${quarter} QTD · quarter goal`} actual={sales.qtdActual} goal={sales.qtdGoal} color="#295d82" />
                    </div>
                </div>
                <div>
                    <div className="mb-2 text-sm font-semibold text-slate-700">
                        Collections
                    </div>
                    <div className="space-y-3">
                        <Bar label="YTD · annual goal" actual={collections.ytdActual} goal={collections.ytdGoal} color="#0e8050" />
                        <Bar label={`Q${quarter} QTD · quarter goal`} actual={collections.qtdActual} goal={collections.qtdGoal} color="#0e8050" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
