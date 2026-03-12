import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/reusable/header";
import Footer from "./components/reusable/footer/footer";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "GoAbroad Prototypes",
    description: "Dedicated to provide a visual for GoAbroad prototype designs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <div className="flex flex-col w-full">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
