/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            boxShadow: {
                "3xl": "0 40px 70px -15px rgba(46, 107, 107, 1)",
            },
            keyframes: {
                Bpulse: {
                    "100%,0%": {
                        transform: " scale(1.05) ",
                    },
                    "50%": { transform: " scale(1) " },
                },

                typewriter: {
                    "0%": { width: "0" },
                    "100%": { width: "100%" },
                },
                blink: {
                    "0%, 100%": { "border-color": "transparent" },
                    "50%": { "border-color": "theme('colors.green.dark')" },
                },
            },

            animation: {
                Bpulse: "Bpulse 3s ease-in-out infinite",
                typewriter: "typewriter 1s steps(40, end) 0s 1 normal both",
                blink: "blink 500ms steps(40) infinite",
            },

            colors: {
                green: {
                    light: "#2D7C7F",
                    DEFAULT: "#2e6b6b",
                    dark: "#1B4A4B",
                },
                blue: {
                    light: "#76ADD4",
                    dark: "#204865",
                },

                gray: {
                    light: "#F5F7FA",
                    DEFAULT: "#D9D9D9",
                    dark: "#AEB1B5",
                },

                zinc: {
                    light: "#E4E6E3",
                    DEFAULT: "#7B8377",
                    dark: "#2D312B",
                },
                cyan: {
                    light: "#99D9DB",
                },
                darkMode: {
                    green: {
                        light: "#3D6D70",
                        DEFAULT: "#3D6D70",
                        dark: "#254E4F",
                    },
                    blue: {
                        light: "#6CA1D9",
                        dark: "#163D53",
                    },
                    gray: {
                        light: "#3A3B3C",
                        DEFAULT: "#A0A3A6",
                        dark: "#5E6165",
                    },
                    zinc: {
                        light: "#D6D8D5",
                        DEFAULT: "#8A9186",
                        dark: "#3F433D",
                    },
                    cyan: {
                        light: "#A5D6D9",
                    },
                },
            },
        },
    },

    plugins: [],
};