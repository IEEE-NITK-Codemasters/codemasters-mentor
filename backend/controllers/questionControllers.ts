import { db } from "../db/db.ts";
import type { Request, Response } from 'express'
import { Questions } from "../db/schema.ts";
import { eq } from 'drizzle-orm'

// GET /question/:id
export async function getQuestion(req: Request, res: Response) {
    try {
        const question = await db.select().from(Questions).where(eq(Questions.id, req.params.id));
        
        if (question.length === 0) {
            res.status(404).json({ message: 'Question not found' });
            return
        }
        
        res.json(question[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}