import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const json = await req.json();
    const exists = await db.questions.findFirst({
        where: {
            name: json.name,
        },
        select: {
            id: true
        }
    });
    if (exists) return NextResponse.json({ err: "question already exists", id: exists.id }, { status: 401 });
    const question = await db.questions.create({
        data: {
            name: json.name,
            categories: {
                connectOrCreate: {
                    create: {
                        name: json.categories.name
                    },
                    where: {
                        name: json.categories.name
                    }
                }
            }
        },
        select: {
            id: true,
            name: true,
            categories: {
                select: {
                    name: true,
                    id: true,
                }
            }
        }
    });

    return NextResponse.json({ question });
}

export const GET = async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    const categorieId = req.nextUrl.searchParams.get("categorieId");
    if (id) {
        const question = await db.questions.findUnique(
            {
                where: {
                    id: id,
                }
            }
        );
        return NextResponse.json({question})
    }
    if(categorieId){
        const questions = await db.questions.findMany({
            where: {
                categoriesIds: {hasSome: [categorieId]},
            }
        });
        return NextResponse.json(questions)
    }
    return NextResponse.json({question:null}, {status:404})
} 