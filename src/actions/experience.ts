"use server";

import { prisma } from "@/lib/prisma";
import { experienceSchema, type ExperienceFormData } from "@/schemas/experience.schema";
import { revalidatePath } from "next/cache";

/**
 * Create a new experience
 */
export async function createExperience(data: ExperienceFormData) {
    try {
        const validated = experienceSchema.parse(data);

        const experience = await prisma.experience.create({
            data: validated,
        });

        revalidatePath("/about");
        revalidatePath("/admin/experience");

        return { success: true, data: experience };
    } catch (error) {
        console.error("Error creating experience:", error);
        return { success: false, error: "Failed to create experience" };
    }
}

/**
 * Update an existing experience
 */
export async function updateExperience(id: string, data: ExperienceFormData) {
    try {
        const validated = experienceSchema.parse(data);

        const experience = await prisma.experience.update({
            where: { id },
            data: validated,
        });

        revalidatePath("/about");
        revalidatePath("/admin/experience");

        return { success: true, data: experience };
    } catch (error) {
        console.error("Error updating experience:", error);
        return { success: false, error: "Failed to update experience" };
    }
}

/**
 * Delete an experience
 */
export async function deleteExperience(id: string) {
    try {
        await prisma.experience.delete({
            where: { id },
        });

        revalidatePath("/about");
        revalidatePath("/admin/experience");

        return { success: true };
    } catch (error) {
        console.error("Error deleting experience:", error);
        return { success: false, error: "Failed to delete experience" };
    }
}

/**
 * Get a single experience by ID
 */
export async function getExperienceById(id: string) {
    try {
        const experience = await prisma.experience.findUnique({
            where: { id },
        });

        return { success: true, data: experience };
    } catch (error) {
        console.error("Error fetching experience:", error);
        return { success: false, error: "Failed to fetch experience" };
    }
}

/**
 * Get all experiences
 */
export async function getAllExperiences() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: [{ order: 'asc' }, { startDate: 'desc' }],
        });

        return { success: true, data: experiences };
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return { success: false, error: "Failed to fetch experiences" };
    }
}

/**
 * Get experiences by type
 */
export async function getExperiencesByType(type: string) {
    try {
        const experiences = await prisma.experience.findMany({
            where: { type },
            orderBy: [{ order: 'asc' }, { startDate: 'desc' }],
        });

        return { success: true, data: experiences };
    } catch (error) {
        console.error("Error fetching experiences:", error);
        return { success: false, error: "Failed to fetch experiences" };
    }
}
