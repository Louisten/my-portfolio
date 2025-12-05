import { getSettings } from "@/actions/settings";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
    const result = await getSettings();
    const settings = result.success && result.data ? result.data : null;

    if (!settings) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">
                        Failed to load settings
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your portfolio profile and contact information
                </p>
            </div>
            <SettingsForm settings={settings} />
        </div>
    );
}
