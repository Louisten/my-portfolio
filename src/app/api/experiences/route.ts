import { NextResponse } from "next/server";
import { getAllExperiences } from "@/actions/experience";

export async function GET() {
    const result = await getAllExperiences();
    return NextResponse.json(result);
}
