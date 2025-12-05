import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <AdminNav />
            <main className="ml-64 flex-1 p-8">{children}</main>
        </div>
    );
}
