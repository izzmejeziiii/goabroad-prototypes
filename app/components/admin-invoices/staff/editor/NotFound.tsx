"use client";

/* Copies src/views/Error/NotFound.js, which AddEditInvoice renders instead
   of the whole frame (no header or sidebar) when /invoices/:id/edit finds
   nothing. Drawn as a fixed full-screen layer over the staff shell. */

import { MdArrowBackIos } from "react-icons/md";
import { buttonClasses } from "../../mui";

/** GA_LOGO: cloudinaryImage(goabroad-logo.png, static, w_200). */
const GA_LOGO = "https://res.cloudinary.com/gaplabs/image/upload/w_200/v1/images2/static/goabroad-logo.png";

const NotFound = () => (
    <div className="lt-root fixed inset-0 z-[1400] flex h-screen w-screen items-center justify-center bg-[#f2f2f2] font-['Roboto',sans-serif] text-[0.8215rem] after:absolute after:size-full after:bg-[rgba(0,0,0,0.5)] after:content-['_']">
        <div className="absolute left-6 top-6 z-[1] flex items-center">
            <MdArrowBackIos className="size-[1em] fill-white" />
            <a href="https://www.goabroad.com" className="font-bold uppercase !text-white !no-underline">
                Back to GoAbroad
            </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
            className="absolute size-full object-cover"
            src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            alt=""
        />
        <div className="relative z-[1] flex min-h-[600px] w-full max-w-[430px] flex-col items-center justify-center rounded-[4px] bg-white p-8 shadow-[0_2px_15px_0_rgba(0,0,0,0.05)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mb-8" src={GA_LOGO} alt="GoAbroad" />
            <h1 className="mb-8 mt-0 max-w-[320px] text-center text-[1.5em] font-bold leading-[1.5em] text-[#333]">
                404: Page Not Found
            </h1>
            <h2 className="mb-8 mt-0 max-w-[320px] text-center text-[1em] font-bold leading-[1.5em] text-[#333]">
                Sorry, we could not find that page. The link you followed may have expired.
            </h2>
            <div className="flex min-h-[50px] items-center justify-center">
                <a
                    href="https://www.goabroad.com/contact"
                    className={buttonClasses({
                        variant: "contained",
                        color: "primary",
                        className: "h-[50px] min-w-[320px] !bg-[#03a9f4] !text-white !no-underline hover:!bg-[#0092d3]",
                    })}
                >
                    Contact Us
                </a>
            </div>
        </div>
    </div>
);

export default NotFound;
