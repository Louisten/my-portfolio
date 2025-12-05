"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, type ExperienceFormData } from "@/schemas/experience.schema";
import { createExperience, updateExperience } from "@/actions/experience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Experience } from "@prisma/client";

interface ExperienceFormProps {
    experience?: Experience;
    mode: "create" | "edit";
}

export function ExperienceForm({ experience, mode }: ExperienceFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [skillInput, setSkillInput] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ExperienceFormData>({
        resolver: zodResolver(experienceSchema),
        defaultValues: experience
            ? {
                type: experience.type as "work" | "education" | "volunteer",
                title: experience.title,
                company: experience.company,
                location: experience.location || "",
                description: experience.description || "",
                skills: experience.skills,
                startDate: experience.startDate,
                endDate: experience.endDate || null,
                current: experience.current,
                order: experience.order,
            }
            : {
                type: "work",
                title: "",
                company: "",
                location: "",
                description: "",
                skills: [],
                startDate: new Date(),
                endDate: undefined,
                current: false,
                order: 0,
            },
    });

    const skills = watch("skills");
    const current = watch("current");

    // Clear endDate when current is checked
    useEffect(() => {
        if (current) {
            setValue("endDate", null);
        }
    }, [current, setValue]);

    // Add skill
    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setValue("skills", [...skills, skillInput.trim()]);
            setSkillInput("");
        }
    };

    // Remove skill
    const removeSkill = (skillToRemove: string) => {
        setValue(
            "skills",
            skills.filter((skill) => skill !== skillToRemove)
        );
    };

    const onSubmit = async (data: ExperienceFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const result =
                mode === "create"
                    ? await createExperience(data)
                    : await updateExperience(experience!.id, data);

            if (result.success) {
                router.push("/admin/experience");
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
                        Fill in the essential details about your experience
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="type">Type *</Label>
                        <select
                            id="type"
                            {...register("type")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="work">Work</option>
                            <option value="education">Education</option>
                            <option value="volunteer">Volunteer</option>
                        </select>
                        {errors.type && (
                            <p className="text-sm text-destructive">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            {...register("title")}
                            placeholder="Senior Full Stack Developer"
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="company">Company/Institution *</Label>
                        <Input
                            id="company"
                            {...register("company")}
                            placeholder="Tech Company Inc."
                        />
                        {errors.company && (
                            <p className="text-sm text-destructive">{errors.company.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            {...register("location")}
                            placeholder="San Francisco, CA (Remote)"
                        />
                        {errors.location && (
                            <p className="text-sm text-destructive">{errors.location.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                    <CardDescription>
                        Describe your responsibilities and achievements
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        {...register("description")}
                        placeholder="Led development of multiple client projects..."
                        rows={6}
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>
                        Add relevant skills and technologies
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addSkill();
                                }
                            }}
                            placeholder="e.g. React, Node.js, TypeScript"
                        />
                        <Button type="button" onClick={addSkill} variant="secondary">
                            Add
                        </Button>
                    </div>
                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-1 hover:text-destructive"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    {errors.skills && (
                        <p className="text-sm text-destructive">{errors.skills.message}</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                    <CardDescription>
                        Specify the duration of this experience
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date *</Label>
                            <Input
                                id="startDate"
                                type="date"
                                {...register("startDate")}
                            />
                            {errors.startDate && (
                                <p className="text-sm text-destructive">{errors.startDate.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                type="date"
                                {...register("endDate")}
                                disabled={current}
                            />
                            {errors.endDate && (
                                <p className="text-sm text-destructive">{errors.endDate.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="current"
                            {...register("current")}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="current" className="cursor-pointer">
                            I currently work here / am currently enrolled
                        </Label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                    <CardDescription>
                        Configure how this experience appears
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            {...register("order", { valueAsNumber: true })}
                            placeholder="0"
                        />
                        <p className="text-xs text-muted-foreground">
                            Lower numbers appear first
                        </p>
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
                            ? "Create Experience"
                            : "Save Changes"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/experience")}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
