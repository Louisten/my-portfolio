"use server";

import { prisma } from "@/lib/prisma";
import { blogPostSchema, type BlogPostFormData } from "@/schemas/blog.schema";
import { revalidatePath } from "next/cache";
import { calculateReadTime } from "@/lib/utils";

/**
 * Create a new blog post
 */
export async function createBlogPost(data: BlogPostFormData) {
    try {
        const validated = blogPostSchema.parse(data);

        // Check if slug already exists
        const existingPost = await prisma.blogPost.findUnique({
            where: { slug: validated.slug },
        });

        if (existingPost) {
            return { success: false, error: "A blog post with this slug already exists" };
        }

        const blogPost = await prisma.blogPost.create({
            data: {
                ...validated,
                coverImage: validated.coverImage || null,
                readTime: calculateReadTime(validated.content),
                publishedAt: validated.published ? new Date() : null,
            },
        });

        revalidatePath("/blog");
        revalidatePath("/admin/blog");

        return { success: true, data: blogPost };
    } catch (error) {
        console.error("Error creating blog post:", error);
        return { success: false, error: "Failed to create blog post" };
    }
}

/**
 * Update an existing blog post
 */
export async function updateBlogPost(id: string, data: BlogPostFormData) {
    try {
        const validated = blogPostSchema.parse(data);

        // Check if slug exists for a different post
        const existingPost = await prisma.blogPost.findFirst({
            where: {
                slug: validated.slug,
                NOT: { id },
            },
        });

        if (existingPost) {
            return { success: false, error: "A blog post with this slug already exists" };
        }

        const blogPost = await prisma.blogPost.update({
            where: { id },
            data: {
                ...validated,
                coverImage: validated.coverImage || null,
                readTime: calculateReadTime(validated.content),
                publishedAt: validated.published ? new Date() : null,
            },
        });

        revalidatePath("/blog");
        revalidatePath(`/blog/${blogPost.slug}`);
        revalidatePath("/admin/blog");

        return { success: true, data: blogPost };
    } catch (error) {
        console.error("Error updating blog post:", error);
        return { success: false, error: "Failed to update blog post" };
    }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string) {
    try {
        await prisma.blogPost.delete({
            where: { id },
        });

        revalidatePath("/blog");
        revalidatePath("/admin/blog");

        return { success: true };
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return { success: false, error: "Failed to delete blog post" };
    }
}

/**
 * Get a single blog post by ID
 */
export async function getBlogPostById(id: string) {
    try {
        const blogPost = await prisma.blogPost.findUnique({
            where: { id },
        });

        return { success: true, data: blogPost };
    } catch (error) {
        console.error("Error fetching blog post:", error);
        return { success: false, error: "Failed to fetch blog post" };
    }
}

/**
 * Get all blog posts (for admin)
 */
export async function getAllBlogPosts() {
    try {
        const blogPosts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return { success: true, data: blogPosts };
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return { success: false, error: "Failed to fetch blog posts" };
    }
}

/**
 * Get published blog posts (for public view)
 */
export async function getPublishedBlogPosts() {
    try {
        const blogPosts = await prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { publishedAt: 'desc' },
        });

        return { success: true, data: blogPosts };
    } catch (error) {
        console.error("Error fetching published blog posts:", error);
        return { success: false, error: "Failed to fetch blog posts" };
    }
}

/**
 * Increment view count for a blog post
 */
export async function incrementBlogViews(slug: string) {
    try {
        await prisma.blogPost.update({
            where: { slug },
            data: {
                views: { increment: 1 },
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error incrementing views:", error);
        return { success: false, error: "Failed to increment views" };
    }
}
