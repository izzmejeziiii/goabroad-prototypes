"use client";

import React, { useCallback } from "react";

interface RatingRangeSliderProps {
    min: number;
    max: number;
    step?: number;
    initialMin?: number;
    initialMax?: number;
    onChange?: (minValue: number, maxValue: number) => void;
}

/**
 * Dual-handle range input used by the Reviews Rating filter. Controlled by the
 * filter state so the two handles and the reset button stay in step.
 */
export default function RatingRangeSlider({
    min,
    max,
    step = 1,
    initialMin = min,
    initialMax = max,
    onChange,
}: RatingRangeSliderProps) {
    const minValue = initialMin;
    const maxValue = initialMax;

    const handleMinChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(e.target.value), maxValue - step);
            onChange?.(value, maxValue);
        },
        [maxValue, step, onChange],
    );

    const handleMaxChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(Number(e.target.value), minValue + step);
            onChange?.(minValue, value);
        },
        [minValue, step, onChange],
    );

    const getPercentage = useCallback(
        (value: number) => ((value - min) / (max - min)) * 100,
        [min, max],
    );

    const minPercent = getPercentage(minValue);
    const maxPercent = getPercentage(maxValue);

    return (
        <div className="rating-range relative h-14 w-full">
            {/* Track */}
            <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 transform rounded-full bg-gray-300" />

            {/* Active range */}
            <div
                className="bg-sun-300 absolute top-1/2 h-2 -translate-y-1/2 transform rounded-full"
                style={{
                    left: `${minPercent}%`,
                    width: `${maxPercent - minPercent}%`,
                }}
            />

            {/* Floating labels */}
            <div
                className="absolute flex flex-col items-center transition-none"
                style={{ left: `${minPercent}%`, transform: "translateX(-50%)", top: 0 }}
            >
                <span className="-mt-2 rounded border bg-gray-500 p-1 px-1 text-xs font-semibold text-white">
                    {minValue}
                </span>
            </div>
            <div
                className="absolute flex flex-col items-center transition-none"
                style={{ left: `${maxPercent}%`, transform: "translateX(-50%)", top: 0 }}
            >
                <span className="-mt-2 rounded border bg-gray-500 p-1 px-1 text-xs font-semibold text-white">
                    {maxValue}
                </span>
            </div>

            {/* Sliders */}
            <input
                aria-label="range-slider-left"
                type="range"
                min={min}
                max={max}
                step={step}
                value={minValue}
                onChange={handleMinChange}
                className="pointer-events-none absolute top-1/2 w-full -translate-y-1/2 transform appearance-none bg-transparent"
                style={{ zIndex: 3 }}
            />
            <input
                aria-label="range-slider-right"
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxValue}
                onChange={handleMaxChange}
                className="pointer-events-none absolute top-1/2 w-full -translate-y-1/2 transform appearance-none bg-transparent"
                style={{ zIndex: 2 }}
            />
        </div>
    );
}
