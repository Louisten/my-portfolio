import { getProjectById } from "@/actions/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
    params,
}: {
    params: { id: string };
}) {
    const result = await getProjectById(params.id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
                <p className="text-muted-foreground">
                    Update project information
                </p>
            </div>
            <ProjectForm mode="edit" project={result.data} />
        </div>
    );
}
