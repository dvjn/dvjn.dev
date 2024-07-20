import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";

export default defineConfig({
    markdown: {
        syntaxHighlight: false,
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: "github-dark-default",
                    keepBackground: false,
                    transformers: [
                        transformerCopyButton({
                            visibility: "hover",
                            feedbackDuration: 1_000,
                        }),
                    ],
                },
            ],
        ],
    },
    integrations: [icon(), mdx()],
});
