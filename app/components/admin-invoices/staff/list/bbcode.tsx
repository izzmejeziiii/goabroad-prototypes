import { Fragment, isValidElement, type ReactNode } from "react";

/* Port of src/components/RemindClientDialog/bbcodeParser.js and
   BBCodeGuide.js: [b] [i] [u] [url] [img] [color] to React, single newlines
   to <br/>, blank lines to paragraphs, and payment links (?openPayment /
   ?paymentOptions) as the email's blue button. */

const PAYMENT_URL_REGEX = /\?(openPayment|paymentOptions)\/?$/i;

type Token = string | ReactNode | { tag: string; option?: string; keyBase: string; index: number };
type Frame = { type: string; children: ReactNode[]; option?: string; keyBase?: string; index?: number };

const isValidHref = (u: string) => {
    if (!u) return false;
    try {
        new URL(u);
        return true;
    } catch {
        return false;
    }
};

const renderUrlTag = (key: string, children: ReactNode[], option?: string) => {
    const href = (option || (typeof children[0] === "string" ? children[0] : "")).trim();
    if (!isValidHref(href))
        return (
            <span key={key}>
                [url={option}]{children}[/url]
            </span>
        );
    if (PAYMENT_URL_REGEX.test(href))
        return (
            <table key={key} role="presentation" cellSpacing={0} cellPadding={0} border={0} style={{ margin: 0 }}>
                <tbody>
                    <tr>
                        <td style={{ borderRadius: "4px", background: "#03a9f4" }}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "block",
                                    maxWidth: "300px",
                                    textAlign: "center",
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    background: "#03a9f4",
                                    border: "1px solid #03a9f4",
                                    fontFamily: "sans-serif",
                                    fontSize: "15px",
                                    lineHeight: "15px",
                                    textDecoration: "none",
                                    padding: "13px 30px",
                                    color: "#fff",
                                    borderRadius: "4px",
                                }}
                            >
                                {option ? children : href}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    return (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {option ? children : href}
        </a>
    );
};

const renderTag = (tag: string, children: ReactNode[], option: string | undefined, keyBase: string, index?: number) => {
    const key = `${keyBase}-${tag}${typeof index !== "undefined" ? `-${index}` : ""}`;
    switch (tag) {
        case "b":
            return <strong key={key}>{children}</strong>;
        case "i":
            return <em key={key}>{children}</em>;
        case "u":
            return <u key={key}>{children}</u>;
        case "url":
            return renderUrlTag(key, children, option);
        case "img": {
            const src = typeof children[0] === "string" ? children[0] : option || "";
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={key} src={src} alt={option || ""} />;
        }
        case "color":
            return (
                <span key={key} style={{ color: option || "inherit" }}>
                    {children}
                </span>
            );
        default:
            return <Fragment key={key}>{children}</Fragment>;
    }
};

export const parseBBCode = (text: string, keyBase = "token"): ReactNode[] => {
    const tokens: Token[] = [];
    const tagRegex = /\[(\/?)(b|i|u|url|img|color)(?:=([^\]]*))?\]|([^[\]]+)/gi;
    let match: RegExpExecArray | null;
    let tokenIndex = 0;
    while ((match = tagRegex.exec(text)) !== null) {
        const [, isClosing, tagName, option, plainText] = match;
        if (plainText) {
            const parts = plainText.split("\n");
            parts.forEach((part, i) => {
                if (part) tokens.push(part);
                if (i < parts.length - 1) tokens.push(<br key={`${keyBase}-br-${tokenIndex++}`} />);
            });
        } else if (isClosing) {
            tokens.push(`[/${tagName}]`);
        } else {
            tokens.push({ tag: tagName.toLowerCase(), option, keyBase, index: tokenIndex++ });
        }
    }

    const stack: Frame[] = [{ type: "root", children: [] }];
    for (const token of tokens) {
        if (typeof token === "string") {
            if (token.startsWith("[/")) {
                const tagName = token.slice(2, -1);
                if (stack.length > 1) {
                    const popped = stack.pop() as Frame;
                    if (popped.type === tagName)
                        stack[stack.length - 1].children.push(
                            renderTag(popped.type, popped.children, popped.option, popped.keyBase ?? keyBase, popped.index),
                        );
                }
            } else stack[stack.length - 1].children.push(token);
        } else if (token && typeof token === "object" && "tag" in token) {
            stack.push({ type: token.tag, children: [], option: token.option, keyBase: token.keyBase, index: token.index });
        } else if (token) {
            stack[stack.length - 1].children.push(token as ReactNode);
        }
    }
    return stack[0].children;
};

export const bbcodeToReact = (input: string) => {
    if (!input) return null;
    const text = input.replace(/\r\n/g, "\n");
    const parts = text.split(/(\n+)/);
    const paragraphs: string[] = [];
    let current = "";
    for (const part of parts) {
        if (!part) continue;
        if (part[0] === "\n") {
            if (part.length === 1) current += "\n";
            else if (part.length === 2) {
                paragraphs.push(current);
                current = "";
            } else current += "\n".repeat(part.length - 1);
        } else current += part;
    }
    if (current !== "") paragraphs.push(current);

    return paragraphs.map((para, p) => {
        const content = parseBBCode(para, `p-${p}`);
        const hasTable = content.some((ch) => isValidElement(ch) && ch.type === "table");
        if (!hasTable)
            return (
                <p key={`p-${p}`} className="py-2">
                    {content}
                </p>
            );
        const nodes: ReactNode[] = [];
        let group: ReactNode[] = [];
        let g = 0;
        content.forEach((ch) => {
            if (isValidElement(ch) && ch.type === "table") {
                if (group.length) {
                    nodes.push(
                        <p key={`p-${p}-g${g++}`} className="py-2">
                            {group}
                        </p>,
                    );
                    group = [];
                }
                nodes.push(ch);
            } else group.push(ch);
        });
        if (group.length)
            nodes.push(
                <p key={`p-${p}-g${g++}`} className="py-2">
                    {group}
                </p>,
            );
        return <Fragment key={`p-${p}`}>{nodes}</Fragment>;
    });
};

const GUIDE = [
    { tag: "[b]", syntax: "[b]text[/b]", notes: "Bold text" },
    { tag: "[i]", syntax: "[i]text[/i]", notes: "Italicize text" },
    { tag: "[u]", syntax: "[u]text[/u]", notes: "Underline text" },
    {
        tag: "[url]",
        syntax: "[url=https://example.com]Link text[/url]",
        notes: "Links with ?openPayment or ?paymentOptions render as a payment button",
    },
    { tag: "[color]", syntax: "[color=#FF0000]text[/color]", notes: "Supports color names and hex codes" },
    { tag: "[img]", syntax: "[img=alt]https://.../image.png[/img]", notes: "Option becomes alt text" },
];

const TH = { textAlign: "left", padding: "8px 12px", borderBottom: "2px solid #e0e0e0" } as const;

export const BBCodeGuide = () => (
    <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
                <tr>
                    <th style={TH}>Tag</th>
                    <th style={TH}>Syntax</th>
                    <th style={TH}>Notes</th>
                </tr>
            </thead>
            <tbody>
                {GUIDE.map(({ tag, syntax, notes }) => (
                    <tr key={tag}>
                        <td style={{ verticalAlign: "top" }}>
                            <div style={{ fontFamily: "monospace", padding: "8px 12px" }}>{tag}</div>
                        </td>
                        <td style={{ verticalAlign: "top" }}>
                            <div style={{ fontFamily: "monospace", padding: "8px 12px" }}>{syntax}</div>
                        </td>
                        <td style={{ verticalAlign: "top", padding: "8px 12px" }}>
                            <div>{notes}</div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
