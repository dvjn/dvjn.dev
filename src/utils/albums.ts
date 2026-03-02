import { getCollection, type CollectionEntry } from "astro:content";
import { format, parse } from "date-fns";
import type { ImageMetadata } from "astro";

type Content = Awaited<ReturnType<CollectionEntry<"albums">["render"]>>["Content"];

export type AlbumPhoto = { image: ImageMetadata; caption?: string };

export type Album = {
    slug: string;
    title: string;
    description?: string;
    cover: ImageMetadata;
    date: string;
    location?: string;
    photos?: AlbumPhoto[];
    Content: Content;
};

export async function getAlbums(): Promise<Album[]> {
    const entries = (await getCollection("albums"))
        .filter((album) => album.data.draft !== true)
        .toSorted((a, b) => {
            const [aM, aY] = a.data.date.split("/").map(Number);
            const [bM, bY] = b.data.date.split("/").map(Number);
            return bY !== aY ? bY - aY : bM - aM;
        });

    return Promise.all(
        entries.map(async (entry) => {
            const { Content } = await entry.render();
            return {
                slug: entry.slug,
                title: entry.data.title,
                description: entry.data.description,
                cover: entry.data.cover,
                date: format(parse(entry.data.date, "MM/yyyy", new Date()), "MMM yyyy"),
                location: entry.data.location,
                photos: entry.data.photos as AlbumPhoto[] | undefined,
                Content,
            };
        }),
    );
}
