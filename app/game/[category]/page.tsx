import db from "@/db";
import { NextResponse } from "next/server";
import GameClient from "./client";

function getRandom(listId: string[]) {
    let list = listId;
    const count = (list.length < 10) ? list.length : 10;
    const response: string[] = [];
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * list.length);
        const element = list[index];
        response.push(element);
        list.splice(index, 1);
    }
    return response;
}

const Game = async (a: any) => {
    const categoryId = a.params.category;
    const questionsRaw = await db.questions.findMany({
        where: {
            categories: {
                some: {
                    id: categoryId,
                }
            },
        },
        select: {
            id: true
        }
    });
    const ids = questionsRaw.map(e => e.id);
    const randomicIds = getRandom(ids);

    const items = await db.questions.findMany(
        {
            where: {
                id: {
                    in: randomicIds
                },
            },
            select: {
                id: true,
                name: true,
            }
        }
    )
    return  <>
        {
            // JSON.stringify(items)
        }
        <GameClient items={ items||[]}/>
    </>
}

export default Game