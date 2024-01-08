import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const categroy = await db.category.findMany({select:{
        name:true,
        id: true,
    }})
    return NextResponse.json({categroy})
}