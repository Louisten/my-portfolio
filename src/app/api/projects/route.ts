import { NextResponse } from "next/server";
import { getPublishedProjects } from "@/actions/projects";

export async function GET() {
    const result = await getPublishedProjects();
    return NextResponse.json(result);
}
