"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { buttonClasses } from "../mui";

/* The full-screen photo frame src/views/Error/*.js and
   src/views/Client/Invoices/ViewInvoice/PaymentSuccess.js share: the Unsplash
   photo under a 50% black wash, a white Paper in the middle with the GoAbroad
   logo. */

export const GA_LOGO = "https://images.goabroad.com/image/upload/w_200/v1/images2/static/goabroad-logo.png";
const PHOTO =
    "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80";

/** The 320×50 #03a9f4 buttons these pages use. */
export const FRAME_BUTTON = clsx(
    buttonClasses({ variant: "contained", color: "primary" }),
    "mt-4 h-[50px] min-w-[320px] !bg-[#03a9f4] hover:!bg-[#0092d3]",
);

const PhotoFrame = ({
    back,
    paperClassName,
    children,
}: {
    back?: { href: string; label: string };
    paperClassName?: string;
    children: ReactNode;
}) => (
    <div className="lt-root relative flex h-screen w-screen items-center justify-center bg-[#f2f2f2] font-[Roboto,sans-serif] antialiased after:absolute after:size-full after:bg-black/50 after:content-['']">
        {back && (
            <div className="absolute left-6 top-6 z-[1] flex items-center">
                <MdArrowBackIos className="size-4 fill-white" />
                <a href={back.href} className="font-bold uppercase !text-white no-underline">
                    {back.label}
                </a>
            </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="absolute size-full object-cover" src={PHOTO} alt="" />
        <div
            className={clsx(
                "relative z-[1] flex min-h-[600px] w-full flex-col items-center justify-center rounded-[4px] bg-white p-8 shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]",
                paperClassName ?? "max-w-[600px]",
            )}
        >
            {children}
        </div>
    </div>
);

export default PhotoFrame;
