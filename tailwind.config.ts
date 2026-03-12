import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "node_modules/preline/dist/*.js",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            zIndex: {
                underground: "-1",
                ground: "1",
                sky: "2",
                outerspace: "3",
                outerverse: "4",
                ultraverse: "5",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                cobalt: {
                    50: "#2DA5D2",
                    100: "#14A3C3",
                    200: "#0F83B9",
                    300: "#0875A7",
                    500: "#0A5E85",
                    600: "#084B6A",
                    700: "#023D58",
                },
                primary: {
                    50: "#E9F7FB",
                    100: "#BAE7F2",
                    200: "#98DCEB",
                    300: "#69CCE2",
                    400: "#4CC2DD",
                    500: "#1FB3D4",
                    600: "#1CA3C1",
                    700: "#167F97",
                    800: "#116275",
                    900: "#0D4B59",
                },
                pacific: {
                    200: "#98DCEB",
                    300: "#69CCE2",
                    500: "#1FB3D4",
                    600: "#1CA3C1",
                    700: "#167F97",
                },
                roman: {
                    200: "#EFB7B3",
                    300: "#E89690",
                    500: "#DC625A",
                    600: "#C85952",
                    700: "#9C4640",
                },
                sun: {
                    200: "#FDD79D",
                    300: "#FCC570",
                    500: "#FAA929",
                    600: "#E49A25",
                    700: "#B2781D",
                },
                fern: {
                    200: "#b9dabf",
                    300: "#9AC9A2",
                    500: "#68AF74",
                    600: "#5F9F6A",
                    700: "#4A7C52",
                },
                error: {
                    500: "#BD002A",
                },
            },
        },
    },
    plugins: [require("preline/plugin"), heroui()],
};
export default config;
