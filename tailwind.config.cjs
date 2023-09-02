const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            dashcolor: "rgb(var(--dash-color))",
            fontcolor: "var(--font-color)",
            secondarycolor: "var(--secondary-color)",
            textcolor: "rgb(var(--text-color))",
            primarycolor: "rgb(var(--primary-color))",
            linkcolor: "rgb(var(--link-color))",
            postbannercolor: "rgb(var(--post-banner-color))",
            ...colors,
        },
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
