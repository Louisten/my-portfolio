"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/experience", label: "Experience" },
    { href: "/admin/blog", label: "Blog" },
];

export function AdminNav() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-card">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/admin" className="text-xl font-bold">
                    CMS Admin
                </Link>
            </div>

            <nav className="flex flex-col gap-1 p-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                            pathname === item.href ? "bg-accent" : ""
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
                <Link
                    href="/admin/settings"
                    className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                        pathname === "/admin/settings" ? "bg-accent" : ""
                    )}
                >
                    Settings
                </Link>
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <Button
                    onClick={async () => {
                        console.log("SignOut button clicked");
                        try {
                            await signOut({ redirect: false });
                            console.log("SignOut completed");
                            window.location.href = "/login";
                        } catch (err) {
                            console.error("SignOut error:", err);
                        }
                    }}
                    variant="outline"
                    className="w-full"
                >
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
