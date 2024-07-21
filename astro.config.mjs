import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
    return function (tree, { data }) {
        const textOnPage = toString(tree);
        const readingTime = getReadingTime(textOnPage);
        data.astro.frontmatter.minutesRead = readingTime.text;
    };
}

export default defineConfig({
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkReadingTime],
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
