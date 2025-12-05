import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
                <p className="text-muted-foreground">
                    Create a new blog post
                </p>
            </div>
            <BlogForm mode="create" />
        </div>
    );
}
