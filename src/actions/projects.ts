"use server";

import { prisma } from "@/lib/prisma";
import { projectSchema, type ProjectFormData } from "@/schemas/project.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Create a new project
 */
export async function createProject(data: ProjectFormData) {
    try {
        // Validate the data
        const validated = projectSchema.parse(data);

        // Check if slug already exists
        const existingProject = await prisma.project.findUnique({
            where: { slug: validated.slug },
        });

        if (existingProject) {
            return { success: false, error: "A project with this slug already exists" };
        }

        // Create the project
        const project = await prisma.project.create({
            data: {
                ...validated,
                demoUrl: validated.demoUrl || null,
                repoUrl: validated.repoUrl || null,
                publishedAt: validated.published ? new Date() : null,
            },
        });

        revalidatePath("/projects");
        revalidatePath("/admin/projects");

        return { success: true, data: project };
    } catch (error) {
        console.error("Error creating project:", error);
        return { success: false, error: "Failed to create project" };
    }
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, data: ProjectFormData) {
    try {
        const validated = projectSchema.parse(data);

        // Check if slug exists for a different project
        const existingProject = await prisma.project.findFirst({
            where: {
                slug: validated.slug,
                NOT: { id },
            },
        });

        if (existingProject) {
            return { success: false, error: "A project with this slug already exists" };
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                ...validated,
                demoUrl: validated.demoUrl || null,
                repoUrl: validated.repoUrl || null,
                publishedAt: validated.published ? new Date() : null,
            },
        });

        revalidatePath("/projects");
        revalidatePath(`/projects/${project.slug}`);
        revalidatePath("/admin/projects");

        return { success: true, data: project };
    } catch (error) {
        console.error("Error updating project:", error);
        return { success: false, error: "Failed to update project" };
    }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        });

        revalidatePath("/projects");
        revalidatePath("/admin/projects");

        return { success: true };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, error: "Failed to delete project" };
    }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
        });

        return { success: true, data: project };
    } catch (error) {
        console.error("Error fetching project:", error);
        return { success: false, error: "Failed to fetch project" };
    }
}

/**
 * Get all projects (for admin)
 */
export async function getAllProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });

        return { success: true, data: projects };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return { success: false, error: "Failed to fetch projects" };
    }
}

/**
 * Get published projects (for public view)
 */
export async function getPublishedProjects() {
    try {
        const projects = await prisma.project.findMany({
            where: { published: true },
            orderBy: [{ order: 'asc' }, { publishedAt: 'desc' }],
        });

        return { success: true, data: projects };
    } catch (error) {
        console.error("Error fetching published projects:", error);
        return { success: false, error: "Failed to fetch projects" };
    }
}

/**
 * Get a single published project by slug (for public view)
 */
export async function getProjectBySlug(slug: string) {
    try {
        const project = await prisma.project.findFirst({
            where: {
                slug,
                published: true
            },
        });

        if (!project) {
            return { success: false, error: "Project not found" };
        }

        return { success: true, data: project };
    } catch (error) {
        console.error("Error fetching project:", error);
        return { success: false, error: "Failed to fetch project" };
    }
}
