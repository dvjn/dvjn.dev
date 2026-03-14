import { getCollection } from "astro:content";
import { differenceInMilliseconds, parse } from "date-fns";
import type { CollectionEntry } from "astro:content";

export async function getPosts(): Promise<CollectionEntry<"posts">[]> {
    return (await getCollection("posts"))
        .filter((post) => post.data.draft !== true)
        .sort((a, b) => {
            const dateDiff = differenceInMilliseconds(
                parse(b.data.published_on, "dd/MM/yyyy", new Date()),
                parse(a.data.published_on, "dd/MM/yyyy", new Date()),
            );
            if (dateDiff !== 0) return dateDiff;
            return b.data.title.localeCompare(a.data.title);
        });
}
