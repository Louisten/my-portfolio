import { getBlogPostById } from "@/actions/blog";
import { BlogForm } from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
    params,
}: {
    params: { id: string };
}) {
    const result = await getBlogPostById(params.id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
                <p className="text-muted-foreground">
                    Update blog post information
                </p>
            </div>
            <BlogForm mode="edit" post={result.data} />
        </div>
    );
}
