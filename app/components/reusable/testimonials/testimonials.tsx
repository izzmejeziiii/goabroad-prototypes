"use client";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import { testimonialData } from "./testimonial";
import TestimonialCard from "./testimonial-card";

export default function Testimonial() {
    return (
        <section className="w-full flex flex-col gap-8 items-center">
            <div className="space-y-4 w-full flex flex-col items-center">
                <h2 className="text-slate-800 font-bold text-[28px] text-center">
                    What Our Current Partners Have to Say
                </h2>
                <p className="text-slate-700 w-full max-w-3xl text-center">
                    With thousands of partners spanning the globe, we’re happy
                    to build new relationships every month while continuing to
                    build on partnerships that are multiple decades in the
                    making.
                </p>
            </div>
            <div className="w-full overflow-x-auto flex py-2 lg:grid lg:grid-cols-[repeat(auto-fill,minmax(410px,1fr))] gap-6">
                {testimonialData.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        testimony={testimonial.testimony}
                        name={testimonial.name}
                        role={testimonial.role}
                        organization={testimonial.organization}
                        image={testimonial.image}
                    />
                ))}
            </div>
            <Link
                href="https://www.goabroad.com/providers"
                className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
            >
                Find Out More About Who We Work With
                <HiArrowSmRight
                    size={16}
                    className="transition-all duration-300 group-hover:translate-x-1"
                />
            </Link>
        </section>
    );
}
