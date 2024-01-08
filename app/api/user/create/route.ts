import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const json = await req.json();
    const user = await db.user.create({
        data: {
            name: json.name,
        },
        select: {
            id: true,
            name: true,
        }
    })
    return NextResponse.json({user})
}