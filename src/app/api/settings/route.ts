import { NextResponse } from "next/server";
import { getSettings } from "@/actions/settings";

export async function GET() {
    const result = await getSettings();
    return NextResponse.json(result);
}
