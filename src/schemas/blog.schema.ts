import { z } from "zod";

export const blogPostSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title is too long"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(200, "Slug is too long")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
    content: z.string().min(50, "Content must be at least 50 characters"),
    coverImage: z.string().url("Cover image must be valid").optional().or(z.literal("")),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    readTime: z.number().int().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
