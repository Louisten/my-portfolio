import { z } from "zod";

export const experienceSchema = z.object({
    type: z.enum(["work", "education", "volunteer"], {
        required_error: "Experience type is required",
    }),
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company/Institution is required"),
    location: z.string().optional(),
    description: z.string().optional(),
    skills: z.array(z.string()).default([]),
    startDate: z.coerce.date({ required_error: "Start date is required" }),
    endDate: z.preprocess(
        (val) => (val === "" || val === null || val === undefined ? undefined : val),
        z.coerce.date().optional()
    ).nullable(),
    current: z.boolean().default(false),
    order: z.number().int().default(0),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
