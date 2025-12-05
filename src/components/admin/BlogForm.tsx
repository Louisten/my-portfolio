"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema, type BlogPostFormData } from "@/schemas/blog.schema";
import { createBlogPost, updateBlogPost } from "@/actions/blog";
import { generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@prisma/client";

interface BlogFormProps {
    post?: BlogPost;
    mode: "create" | "edit";
}

export function BlogForm({ post, mode }: BlogFormProps) {
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
    } = useForm<BlogPostFormData>({
        resolver: zodResolver(blogPostSchema),
        defaultValues: post
            ? {
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                coverImage: post.coverImage || "",
                tags: post.tags,
                published: post.published,
                featured: post.featured,
            }
            : {
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                coverImage: "",
                tags: [],
                published: false,
                featured: false,
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

    const onSubmit = async (data: BlogPostFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result =
                mode === "create"
                    ? await createBlogPost(data)
                    : await updateBlogPost(post!.id, data);

            if (result.success) {
                router.push("/admin/blog");
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
                        Fill in the essential details about your blog post
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
                            placeholder="My Awesome Blog Post"
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
                            placeholder="my-awesome-blog-post"
                        />
                        {errors.slug && (
                            <p className="text-sm text-destructive">{errors.slug.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt *</Label>
                        <Textarea
                            id="excerpt"
                            {...register("excerpt")}
                            placeholder="A brief summary of your post..."
                            rows={3}
                        />
                        {errors.excerpt && (
                            <p className="text-sm text-destructive">{errors.excerpt.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
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
                    <CardTitle>Content *</CardTitle>
                    <CardDescription>
                        Write your blog post content (supports Markdown)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        {...register("content")}
                        placeholder="Write your blog post content here..."
                        rows={15}
                    />
                    {errors.content && (
                        <p className="text-sm text-destructive">{errors.content.message}</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tags *</CardTitle>
                    <CardDescription>
                        Add tags to categorize your blog post
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
                            placeholder="e.g. JavaScript, Web Development, Tutorial"
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
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>
                        Configure visibility and featured status
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                            Featured (highlight on blog page)
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
                            ? "Create Post"
                            : "Save Changes"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/blog")}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
