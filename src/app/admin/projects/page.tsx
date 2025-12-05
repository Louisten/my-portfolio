import { getAllProjects } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AdminProjectsPage() {
    const result = await getAllProjects();
    const projects = result.success && result.data ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio projects
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/projects/new">Create Project</Link>
                </Button>
            </div>

            {projects.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="mb-4 text-muted-foreground">No projects yet</p>
                        <Button asChild>
                            <Link href="/admin/projects/new">Create your first project</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <Card key={project.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CardTitle>{project.title}</CardTitle>
                                            {project.published ? (
                                                <Badge className="bg-green-500">Published</Badge>
                                            ) : (
                                                <Badge variant="secondary">Draft</Badge>
                                            )}
                                            {project.featured && (
                                                <Badge variant="outline">Featured</Badge>
                                            )}
                                        </div>
                                        <CardDescription className="mt-2">
                                            {project.description}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" asChild>
                                            <Link href={`/admin/projects/edit/${project.id}`}>
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-primary/10 px-2 py-1 text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
