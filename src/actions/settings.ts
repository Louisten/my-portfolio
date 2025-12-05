"use server";

import { prisma } from "@/lib/prisma";
import { settingsSchema, type SettingsFormData } from "@/schemas/settings.schema";
import { revalidatePath } from "next/cache";

/**
 * Get portfolio settings (creates default if not exists)
 */
export async function getSettings() {
    try {
        let settings = await prisma.settings.findFirst();

        // Create default settings if none exist
        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    id: "default",
                    name: "Your Name",
                    tagline: "Welcome to my portfolio! Update this text in the Settings page.",
                    bio: "Welcome to my portfolio! Update this text in the Settings page.",
                    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "GraphQL"],
                },
            });
        }

        return { success: true, data: settings };
    } catch (error) {
        console.error("Error fetching settings:", error);
        return { success: false, error: "Failed to fetch settings" };
    }
}

/**
 * Update portfolio settings
 */
export async function updateSettings(data: SettingsFormData) {
    try {
        const validated = settingsSchema.parse(data);

        // Get or create settings
        let settings = await prisma.settings.findFirst();

        if (!settings) {
            settings = await prisma.settings.create({
                data: {
                    id: "default",
                    ...validated,
                },
            });
        } else {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: validated,
            });
        }

        // Revalidate all pages that use settings
        revalidatePath("/");
        revalidatePath("/about");
        revalidatePath("/projects");
        revalidatePath("/blog");
        revalidatePath("/admin/settings");

        return { success: true, data: settings };
    } catch (error) {
        console.error("Error updating settings:", error);
        return { success: false, error: "Failed to update settings" };
    }
}
