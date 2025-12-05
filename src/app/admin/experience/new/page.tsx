import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Experience</h1>
                <p className="text-muted-foreground">
                    Add a new work experience, education, or volunteer position
                </p>
            </div>
            <ExperienceForm mode="create" />
        </div>
    );
}
