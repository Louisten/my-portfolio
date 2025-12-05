import { getAllExperiences } from "@/actions/experience";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
    const result = await getAllExperiences();
    const experiences = result.success && result.data ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground">
                        Manage your work history and education
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/experience/new">Add Experience</Link>
                </Button>
            </div>

            {experiences.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="mb-4 text-muted-foreground">No experiences yet</p>
                        <Button asChild>
                            <Link href="/admin/experience/new">Add your first experience</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <Card key={exp.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CardTitle>{exp.title}</CardTitle>
                                            <Badge variant={exp.type === "work" ? "default" : "secondary"}>
                                                {exp.type}
                                            </Badge>
                                            {exp.current && <Badge className="bg-green-500">Current</Badge>}
                                        </div>
                                        <CardDescription className="mt-1">
                                            {exp.company} • {exp.location}
                                        </CardDescription>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {formatDate(exp.startDate)}
                                            {" - "}
                                            {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                                        </p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/admin/experience/edit/${exp.id}`}>Edit</Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {exp.description && (
                                    <p className="mb-3 text-sm text-muted-foreground">{exp.description}</p>
                                )}
                                {exp.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill) => (
                                            <span key={skill} className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
