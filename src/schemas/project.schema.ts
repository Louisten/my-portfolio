import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title is too long"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(200, "Slug is too long")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    coverImage: z.string().url("Cover image must be a valid URL"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    demoUrl: z.string().url("Demo URL must be valid").optional().or(z.literal("")),
    repoUrl: z.string().url("Repo URL must be valid").optional().or(z.literal("")),
    content: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    published: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
