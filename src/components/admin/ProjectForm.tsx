"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "@/schemas/project.schema";
import { createProject, updateProject } from "@/actions/projects";
import { generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@prisma/client";

interface ProjectFormProps {
    project?: Project;
    mode: "create" | "edit";
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: project
            ? {
                title: project.title,
                slug: project.slug,
                description: project.description,
                coverImage: project.coverImage,
                tags: project.tags,
                demoUrl: project.demoUrl || "",
                repoUrl: project.repoUrl || "",
                content: project.content || "",
                featured: project.featured,
                order: project.order,
                published: project.published,
            }
            : {
                title: "",
                slug: "",
                description: "",
                coverImage: "",
                tags: [],
                demoUrl: "",
                repoUrl: "",
                content: "",
                featured: false,
                order: 0,
                published: false,
            },
    });

    const title = watch("title");
    const tags = watch("tags");

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        if (mode === "create") {
            setValue("slug", generateSlug(newTitle));
        }
    };

    // Add tag
    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setValue("tags", [...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        setValue(
            "tags",
            tags.filter((tag) => tag !== tagToRemove)
        );
    };

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result =
                mode === "create"
                    ? await createProject(data)
                    : await updateProject(project!.id, data);

            if (result.success) {
                router.push("/admin/projects");
                router.refresh();
            } else {
                setError(result.error || "An error occurred");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                        Fill in the essential details about your project
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            onChange={(e) => {
                                register("title").onChange(e);
                                handleTitleChange(e);
                            }}
                            placeholder="My Awesome Project"
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                            id="slug"
                            {...register("slug")}
                            placeholder="my-awesome-project"
                        />
                        {errors.slug && (
                            <p className="text-sm text-destructive">{errors.slug.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="A brief description of your project..."
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL *</Label>
                        <Input
                            id="coverImage"
                            {...register("coverImage")}
                            type="url"
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.coverImage && (
                            <p className="text-sm text-destructive">{errors.coverImage.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Links & URLs</CardTitle>
                    <CardDescription>
                        Add demo and repository URLs (optional)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="demoUrl">Demo URL</Label>
                        <Input
                            id="demoUrl"
                            {...register("demoUrl")}
                            type="url"
                            placeholder="https://example.com"
                        />
                        {errors.demoUrl && (
                            <p className="text-sm text-destructive">{errors.demoUrl.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="repoUrl">Repository URL</Label>
                        <Input
                            id="repoUrl"
                            {...register("repoUrl")}
                            type="url"
                            placeholder="https://github.com/username/repo"
                        />
                        {errors.repoUrl && (
                            <p className="text-sm text-destructive">{errors.repoUrl.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tags *</CardTitle>
                    <CardDescription>
                        Add technology tags to categorize your project
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTag();
                                }
                            }}
                            placeholder="e.g. React, TypeScript, Next.js"
                        />
                        <Button type="button" onClick={addTag} variant="secondary">
                            Add
                        </Button>
                    </div>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 hover:text-destructive"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    {errors.tags && (
                        <p className="text-sm text-destructive">{errors.tags.message}</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Additional Content</CardTitle>
                    <CardDescription>
                        Optional detailed content about the project (supports Markdown)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        {...register("content")}
                        placeholder="Detailed project description, case study, or technical details..."
                        rows={10}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                        Configure visibility and ordering
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            {...register("order", { valueAsNumber: true })}
                            placeholder="0"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="published"
                            {...register("published")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="published" className="cursor-pointer">
                            Published (visible on public site)
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="featured"
                            {...register("featured")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="featured" className="cursor-pointer">
                            Featured (highlight on homepage)
                        </Label>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                    {error}
                </div>
            )}

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? mode === "create"
                            ? "Creating..."
                            : "Saving..."
                        : mode === "create"
                            ? "Create Project"
                            : "Save Changes"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/projects")}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
