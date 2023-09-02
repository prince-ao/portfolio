import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import remarkToc from "remark-toc";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), tailwind()],
    markdown: {
        shikiConfig: {
            theme: "nord",
        },
        remarkPlugins: ["remark-gfm", "remark-smartypants", remarkToc],
        rehypePlugins: [
            [
                "rehype-external-links",
                {
                    target: "_blank",
                },
            ],
        ],
    },
});
