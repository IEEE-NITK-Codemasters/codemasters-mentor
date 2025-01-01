import {Request, Response} from "express";
import { db } from "../db/db.ts";
import { Submissions } from "@codemasters/db";
import {and,eq,desc} from "drizzle-orm";

export async function getSubmissions(req: Request, res: Response) {
    const userId = req.query.userId as string
    const questionId = req.query.questionId as string

    try {
        const submissions = await db.select()
            .from(Submissions)
            .where(
                and(
                    eq(Submissions.userId, parseInt(userId)), 
                    eq(Submissions.quesId, parseInt(questionId))
                )
            )
            .orderBy(desc(Submissions.id))
        res.json(submissions)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}