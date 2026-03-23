import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    tags: z.array(z.string()),
    category: z.enum(['web3', 'app', 'devtool']),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { products };
