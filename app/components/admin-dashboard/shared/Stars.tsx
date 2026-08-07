import { FiStar } from "react-icons/fi";

export default function Stars({
    rating,
    className = "",
}: {
    rating: number;
    className?: string;
}) {
    return (
        <span className={`inline-flex items-center gap-0.5 ${className}`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                    key={i}
                    className={`h-3.5 w-3.5 ${
                        i < rating
                            ? "fill-sun-500 text-sun-500"
                            : "text-slate-300"
                    }`}
                />
            ))}
        </span>
    );
}
