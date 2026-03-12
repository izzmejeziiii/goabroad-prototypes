'use client';

import { useEffect, useState } from "react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
} from "@headlessui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Link from "next/link";
import FooterLink from "./footer-link";
import { useMediaQuery } from "react-responsive";

export type FooterLinkGroupProp = {
    title: string;
    links: (Partial<HTMLAnchorElement> & {
        label: string;
        key?: string;
        isContact?: boolean;
    })[];
    open?: boolean;
    name?: string;
    close?: () => void;
};

export function FooterGroup({ title, links }: FooterLinkGroupProp) {
    const [isDesktop, setIsDesktop] = useState(false);
    const isDesktopMedia = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        setIsDesktop(isDesktopMedia);
    }, [isDesktopMedia]);

    return (
        <Disclosure as="div" className="col-span-1">
            {({ open }) => (
                <>
                    <DisclosureButton
                        className="relative text-left text-sm font-bold text-neutral-800"
                        as="h3"
                        disabled={isDesktop}
                    >
                        {title}
                        {open ? (
                            <HiChevronUp
                                className="absolute right-0 top-0 text-neutral-400 lg:hidden"
                                fontSize={24}
                            />
                        ) : (
                            <HiChevronDown
                                className="absolute right-0 top-0 text-neutral-400 lg:hidden"
                                fontSize={24}
                            />
                        )}
                    </DisclosureButton>
                    <Transition
                        show={isDesktopMedia ? isDesktop : open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform  opacity-0"
                        enterTo="transform opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                        as="div"
                    >
                        <DisclosurePanel className={"noscript-hidden"}>
                            <nav className="mt-4 flex flex-col space-y-6 lg:space-y-2">
                                {links.map(({ label, ...link }, index) => {
                                    const href = link.href;
                                    const isContact = link.isContact;

                                    return (
                                        <FooterLink
                                            isContact={isContact}
                                            key={`footer-link-${index}`}
                                            href={href}
                                        >
                                            {label}
                                        </FooterLink>
                                    );
                                })}
                            </nav>
                        </DisclosurePanel>
                    </Transition>
                    <noscript>
                        <nav className="flex flex-col space-y-6 lg:space-y-2">
                            <ul>
                                {links.map(({ label, ...link }, index) => {
                                    const href = link.href;

                                    return (
                                        <li
                                            key={`noscript-footer-link-${index}`}
                                            className="underline"
                                        >
                                            <Link
                                                href={href!}
                                                className="block text-xs font-normal text-neutral-700 hover:underline"
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </noscript>
                </>
            )}
        </Disclosure>
    );
}

export default function FooterLinkGroup(props: FooterLinkGroupProp) {
    return (
        <section className="flex flex-col space-y-4">
            <Disclosure>
                <FooterGroup {...props} />
            </Disclosure>
        </section>
    );
}
