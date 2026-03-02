import { defineCollection, z } from "astro:content";

export const collections = {
    posts: defineCollection({
        schema: ({ image }) =>
            z.object({
                title: z.string(),
                description: z.string().optional(),
                cover: image().optional(),
                cover_caption: z.string().optional(),
                tags: z.array(z.string()).optional(),
                published_on: z.string(),
                draft: z.boolean().optional(),
            }),
    }),
    albums: defineCollection({
        schema: ({ image }) =>
            z.object({
                title: z.string(),
                cover: image(),
                description: z.string().optional(),
                date: z.string(),
                location: z.string().optional(),
                photos: z
                    .array(
                        z.union([
                            image(),
                            z.object({
                                image: image(),
                                caption: z.string().optional(),
                            }),
                        ]),
                    )
                    .optional(),
                draft: z.boolean().optional(),
            }),
    }),
};
