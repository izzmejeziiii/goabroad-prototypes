"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { CgClose } from "react-icons/cg";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useCompare } from "./compare-context";

const MYG_URL = "https://my.goabroad.com";
const ADMIN_URL = "https://admin.goabroad.com";
const GA_LOGO =
    "https://images.goabroad.com/image/upload/h_208,w_272/v1/images2/goabroad-logo.webp";

function Input({
    label,
    name,
    type = "text",
}: {
    label: string;
    name: string;
    type?: string;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <div className="relative rounded-md shadow-sm">
                <input
                    id={name}
                    name={name}
                    type={isPassword && showPassword ? "text" : type}
                    className={clsx(
                        "block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-shadow placeholder:text-xs placeholder:text-gray-500 focus:border-blue-500 focus:ring-3 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-100 sm:placeholder:text-sm",
                        isPassword && "pr-8",
                    )}
                />
                {isPassword &&
                    (showPassword ? (
                        <HiEye
                            className="absolute right-3 top-3 cursor-pointer text-slate-500 transition-colors hover:text-slate-700"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPassword(false);
                            }}
                        />
                    ) : (
                        <HiEyeOff
                            className="absolute right-3 top-3 cursor-pointer text-slate-500 transition-colors hover:text-slate-700"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowPassword(true);
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}

/**
 * GoAbroad's MyGoAbroad sign-in modal, ported from the production auth modal.
 * Comparing programs is an account feature, so pressing Compare asks the
 * visitor to sign in. Authentication itself is inert in the prototype.
 */
export default function SignInModal() {
    const { isOpen, closeCompare } = useCompare();

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeCompare();
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, closeCompare]);

    if (!isOpen) return null;

    return (
        <div className="z-ultraverse-6 fixed left-0 top-0 flex h-screen w-screen items-end justify-center overflow-hidden bg-zinc-400/50 transition-all md:items-center md:overflow-auto">
            <div
                className="absolute inset-0"
                onClick={closeCompare}
                aria-hidden="true"
            />
            <div className="relative flex max-h-screen w-full max-w-xl flex-col overflow-y-auto bg-white p-4 text-left align-middle md:h-auto md:max-h-[92vh] md:rounded-2xl md:p-6">
                <button
                    className="z-sky group absolute right-3 top-3 rounded-full p-2 transition-all hover:bg-slate-100 hover:text-slate-700"
                    onClick={closeCompare}
                >
                    <span className="sr-only">Close</span>
                    <CgClose
                        fontSize={22}
                        className="text-slate-400 group-hover:text-slate-700"
                    />
                </button>
                <div className="mb-4 block p-4 lg:hidden">
                    <Image
                        src={GA_LOGO}
                        alt="GoAbroad"
                        className="h-20 w-auto"
                        height={123}
                        width={160}
                    />
                </div>
                <div className="flex w-full flex-1 flex-col justify-center p-4 sm:px-6 md:p-6">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-neutral-800">
                            Welcome to MyGoAbroad
                        </h2>
                        <p className="mt-2 max-w-lg text-lg tracking-tight text-neutral-700">
                            Sign in to your account.
                        </p>
                        <p className="my-4 mt-2 text-left text-sm font-semibold md:text-base">
                            Don&apos;t have an account?&nbsp;
                            <a
                                className="text-cobalt-600 hover:text-cobalt-700 font-medium hover:underline"
                                href={`${MYG_URL}/auth/register`}
                            >
                                Sign up now.
                            </a>
                        </p>
                    </div>
                    <div className="mt-4">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                        >
                            <div className="col-span-full">
                                <Input
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </div>
                            <div className="col-span-full">
                                <Input
                                    type="password"
                                    label="Password"
                                    name="password"
                                />
                            </div>
                            <div className="col-span-full flex flex-row-reverse items-center justify-between">
                                <div className="text-sm">
                                    <a
                                        className="text-cobalt-600 hover:text-cobalt-700 font-medium hover:underline"
                                        href={`${MYG_URL}/auth/forgot-password`}
                                        target="_blank"
                                    >
                                        Forgot password
                                    </a>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    className="bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-100 mt-2 flex w-full justify-center rounded-md border border-transparent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-shadow focus:outline-none focus:ring-3 disabled:bg-red-400 disabled:opacity-50"
                                >
                                    Sign in
                                </button>
                            </div>
                            <div className="col-span-full flex w-full justify-center">
                                <p className="max-w-[316px] text-center leading-4 text-neutral-400">
                                    <small>
                                        {" "}
                                        This site is protected by Google reCAPTCHA.
                                    </small>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-auto flex max-w-xs self-center">
                    <p className="mb-2 mt-auto inline w-full px-6 text-center text-neutral-700">
                        <small>
                            Do you have programs listed on GoAbroad?{" "}
                            <a
                                href={ADMIN_URL}
                                className="text-cobalt-600 hover:underline"
                            >
                                Click here to sign in to your client account.
                            </a>
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
}
