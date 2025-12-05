import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProjects } from "@/actions/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
    const result = await getAllProjects();
    const projects = result.success && result.data ? result.data : [];

    const publishedCount = projects.filter((p) => p.published).length;
    const draftCount = projects.filter((p) => !p.published).length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your portfolio CMS
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Projects</CardTitle>
                        <CardDescription>All projects in your portfolio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{projects.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Published</CardTitle>
                        <CardDescription>Projects visible to the public</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{publishedCount}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Drafts</CardTitle>
                        <CardDescription>Unpublished projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{draftCount}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Quick Actions</h2>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/admin/projects/new">New Project</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/projects">View Public Site</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
