import { getCollection, type CollectionEntry } from "astro:content";
import { differenceInMilliseconds, format, parse } from "date-fns";
import type { ImageMetadata } from "astro";

type Content = Awaited<ReturnType<CollectionEntry<"posts">["render"]>>["Content"];

export type Post = {
    slug: string;
    title: string;
    description?: string;
    publishedOn: string;
    tags?: string[];
    cover?: ImageMetadata;
    coverCaption?: string;
    minutesRead?: string;
    Content: Content;
};

export async function getPosts(): Promise<Post[]> {
    const entries = (await getCollection("posts"))
        .filter((post) => post.data.draft !== true)
        .sort((a, b) => {
            const dateDiff = differenceInMilliseconds(
                parse(b.data.published_on, "dd/MM/yyyy", new Date()),
                parse(a.data.published_on, "dd/MM/yyyy", new Date()),
            );
            if (dateDiff !== 0) return dateDiff;
            return b.data.title.localeCompare(a.data.title);
        });

    return Promise.all(
        entries.map(async (entry) => {
            const { Content, remarkPluginFrontmatter } = await entry.render();
            return {
                slug: entry.slug,
                title: entry.data.title,
                description: entry.data.description,
                tags: entry.data.tags,
                cover: entry.data.cover,
                coverCaption: entry.data.cover_caption,
                publishedOn: format(parse(entry.data.published_on, "dd/MM/yyyy", new Date()), "MMM yyyy"),
                minutesRead: remarkPluginFrontmatter.minutesRead as string | undefined,
                Content,
            };
        }),
    );
}
