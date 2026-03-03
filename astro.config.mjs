import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import sitemap from "@astrojs/sitemap";
import vanityUrls from "./src/data/go_vanity_urls.json" assert { type: "json" };

const vanityUrlPaths = new Set(vanityUrls.map((u) => `https://dvjn.dev/${u.name}/`));

export function remarkReadingTime() {
  return function (tree, {
    data
  }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage, {
      wordsPerMinute: 100
    });
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://dvjn.dev",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [[rehypePrettyCode, {
      theme: "aurora-x",
      keepBackground: false,
      transformers: [transformerCopyButton({
        visibility: "hover",
        feedbackDuration: 1_000
      })]
    }], rehypeSlug, [rehypeAutoLinkHeadings, {
      behavior: "wrap"
    }]]
  },
  integrations: [icon(), mdx(), sitemap({ filter: (page) => !vanityUrlPaths.has(page) })]
});