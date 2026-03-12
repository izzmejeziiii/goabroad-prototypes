"use client";

import Link from "next/link";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children?: React.ReactNode;
    isContact?: boolean;
};

const FooterLink = ({
    children,
    className,
    isContact = false,
    ...props
}: Props) => {
    if (isContact) {
        return (
            <a
                referrerPolicy="unsafe-url"
                href={props.href || "#"}
                rel={props.rel}
                target={props.target}
                className={`block text-xs font-normal text-neutral-700 hover:underline ${className}`}
                {...props}
            >
                {children}
            </a>
        );
    }
    return (
        <Link
            href={props.href || "#"}
            rel={props.rel}
            target={props.target}
            className={`block text-xs font-normal text-neutral-700 hover:underline ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
};

export default FooterLink;
