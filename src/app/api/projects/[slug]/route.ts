import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/actions/projects";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const result = await getProjectBySlug(slug);

    if (!result.success) {
        return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result);
}
