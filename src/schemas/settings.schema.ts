import { z } from "zod";

export const settingsSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    tagline: z.string().min(10, "Tagline must be at least 10 characters"),
    bio: z.string().min(10, "Bio must be at least 10 characters"),
    techStack: z.array(z.string()).default(["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "GraphQL"]),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    location: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
