import { getExperienceById } from "@/actions/experience";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({
    params,
}: {
    params: { id: string };
}) {
    const result = await getExperienceById(params.id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
                <p className="text-muted-foreground">
                    Update experience information
                </p>
            </div>
            <ExperienceForm mode="edit" experience={result.data} />
        </div>
    );
}
