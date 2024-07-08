import { z, defineCollection } from "astro:content";

export const collections = {
    posts: defineCollection({
        schema: ({ image }) =>
            z.object({
                title: z.string(),
                cover: image().optional(),
                cover_caption: z.string().optional(),
                tags: z.array(z.string()).optional(),
                published_on: z.string(),
            }),
    }),
};
