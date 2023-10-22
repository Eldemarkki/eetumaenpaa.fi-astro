import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    releaseDate: z.string(),
    excerpt: z.string(),
  }),
});

const projectCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    blogTitle: z.string(),
    releaseDate: z.string(),
    description: z.string(),
    links: z.array(
      z.object({
        href: z.string(),
        title: z.string(),
      }),
    ),
  }),
});

export const collections = {
  blog: blogCollection,
  project: projectCollection,
};
