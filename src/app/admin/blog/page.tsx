import { getAllBlogPosts } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminBlogPage() {
    const result = await getAllBlogPosts();
    const posts = result.success && result.data ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground">
                        Manage your blog content
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/blog/new">New Post</Link>
                </Button>
            </div>

            {posts.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <p className="mb-4 text-muted-foreground">No blog posts yet</p>
                        <Button asChild>
                            <Link href="/admin/blog/new">Write your first post</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <CardTitle>{post.title}</CardTitle>
                                            {post.published ? (
                                                <Badge className="bg-green-500">Published</Badge>
                                            ) : (
                                                <Badge variant="secondary">Draft</Badge>
                                            )}
                                            {post.featured && <Badge variant="outline">Featured</Badge>}
                                        </div>
                                        <CardDescription className="mt-2 line-clamp-2">
                                            {post.excerpt}
                                        </CardDescription>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            {post.readTime} min read • {post.views} views
                                        </p>
                                    </div>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={`/admin/blog/edit/${post.id}`}>Edit</Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="rounded-full bg-primary/10 px-2 py-1 text-xs">
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
