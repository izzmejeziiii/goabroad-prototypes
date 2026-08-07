import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import { Header } from "../components/ayu-giving/header/Header";
import Footer from "../components/ayu-giving/Footer";

// AYU Giving runs its own type stack (Nunito for body, Nunito Sans for
// headings) and a cream page background. Both are scoped to this route so the
// rest of the prototype library keeps its Inter / white treatment. The
// GoAbroad header and footer suppress themselves on /ayu-giving.
const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito",
    display: "swap",
});

const nunitoSans = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-nunito-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "AYU Giving — Campaign Detail",
    description:
        "Prototype of the AYU Giving campaign detail page, with dummy content.",
};

export default function AyuGivingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`ayu-root ${nunito.variable} ${nunitoSans.variable} antialiased min-h-screen w-full bg-[#FFFCF5] flex flex-col items-center relative`}
        >
            <Header />
            <div id="main-content" className="w-full z-10" role="main">
                {children}
            </div>
            <Footer />
        </div>
    );
}
