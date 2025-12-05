"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, type SettingsFormData } from "@/schemas/settings.schema";
import { updateSettings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Settings } from "@prisma/client";

interface SettingsFormProps {
    settings: Settings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [techStack, setTechStack] = useState<string[]>(settings.techStack || []);
    const [newTech, setNewTech] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: settings.name,
            tagline: settings.tagline,
            bio: settings.bio,
            techStack: settings.techStack || [],
            email: settings.email || "",
            github: settings.github || "",
            linkedin: settings.linkedin || "",
            twitter: settings.twitter || "",
            location: settings.location || "",
        },
    });

    const addTech = () => {
        const trimmed = newTech.trim();
        if (trimmed && !techStack.includes(trimmed)) {
            const updated = [...techStack, trimmed];
            setTechStack(updated);
            setValue("techStack", updated);
            setNewTech("");
        }
    };

    const removeTech = (tech: string) => {
        const updated = techStack.filter((t) => t !== tech);
        setTechStack(updated);
        setValue("techStack", updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTech();
        }
    };

    const onSubmit = async (data: SettingsFormData) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            // Ensure techStack is included
            data.techStack = techStack;
            const result = await updateSettings(data);

            if (result.success) {
                setSuccess(true);
                router.refresh();
                setTimeout(() => setSuccess(false), 3000);
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
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Your name and bio will appear on your portfolio
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            {...register("name")}
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tagline">Homepage Tagline *</Label>
                        <Textarea
                            id="tagline"
                            {...register("tagline")}
                            placeholder="Full Stack Developer specializing in Next.js, React, and TypeScript..."
                            rows={3}
                        />
                        {errors.tagline && (
                            <p className="text-sm text-destructive">{errors.tagline.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio/About *</Label>
                        <Textarea
                            id="bio"
                            {...register("bio")}
                            placeholder="Tell visitors about yourself..."
                            rows={6}
                        />
                        {errors.bio && (
                            <p className="text-sm text-destructive">{errors.bio.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tech Stack</CardTitle>
                    <CardDescription>
                        Technologies you work with (displayed on the homepage)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                onClick={() => removeTech(tech)}
                            >
                                {tech} ×
                            </Badge>
                        ))}
                        {techStack.length === 0 && (
                            <p className="text-sm text-muted-foreground">No technologies added yet</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add a technology (e.g., React, Python, Docker)"
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Button type="button" variant="secondary" onClick={addTech}>
                            Add
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Click on a technology to remove it. Press Enter or click Add to add new ones.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                        Optional contact details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="hello@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            {...register("location")}
                            placeholder="San Francisco, CA"
                        />
                        {errors.location && (
                            <p className="text-sm text-destructive">{errors.location.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>
                        Add your social media profiles (full URLs)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                            id="github"
                            type="url"
                            {...register("github")}
                            placeholder="https://github.com/yourusername"
                        />
                        {errors.github && (
                            <p className="text-sm text-destructive">{errors.github.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                            id="linkedin"
                            type="url"
                            {...register("linkedin")}
                            placeholder="https://linkedin.com/in/yourusername"
                        />
                        {errors.linkedin && (
                            <p className="text-sm text-destructive">{errors.linkedin.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter/X</Label>
                        <Input
                            id="twitter"
                            type="url"
                            {...register("twitter")}
                            placeholder="https://twitter.com/yourusername"
                        />
                        {errors.twitter && (
                            <p className="text-sm text-destructive">{errors.twitter.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-md bg-green-500/10 p-4 text-sm text-green-600">
                    Settings saved successfully!
                </div>
            )}

            <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Settings"}
                </Button>
            </div>
        </form>
    );
}
