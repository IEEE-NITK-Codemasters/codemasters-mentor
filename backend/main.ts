// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import { RunRequestBody } from "./types/RunRequestBody.ts"
import { RunResponseBody } from "./types/RunResponseBody.ts";
import cors from 'cors'
import {Queue} from 'bullmq'
import IORedis from 'ioredis'
import { db } from "./db/db.ts"
import { Submissions, Users } from "./db/schema.ts"
import { Questions } from "./db/schema.ts";
import { user } from "./types/userType.ts"
import { eq, gte, and } from "drizzle-orm";

const redis = new IORedis.default();
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;
const runQueue = new Queue('run-queue', { connection: redis })
const submitQueue = new Queue('submit-queue', { connection: redis })

app.use(express.json());
app.use(cors())

app.post("/question/run", async (req: Request, res: Response) => {
    const reqBody: RunRequestBody = req.body
    await runQueue.add('run-task',reqBody)
    res.sendStatus(200);
});

app.get("/question/run", async (req: Request, res: Response) => {
    const userId = req.query.userId as string
    const questionId = req.query.questionId as string
    const key = 'run' + userId + questionId
    const outputString = await redis.get(key)
    if (outputString === null) {
        res.sendStatus(204)
        return
    }

    const output: RunResponseBody = JSON.parse(outputString)
    await redis.del(key)
    res.json(output)
})

app.post("/question/submit", async (req: Request, res: Response) => {
    const reqBody: RunRequestBody = req.body
    const result = await db.select().from(Questions).where(eq(Questions.id, reqBody.questionId));

    //console.log(result);
    reqBody['stdin'] = result[0].testcase;
    reqBody['expected_output'] = result[0].expected_output;

    await submitQueue.add('submit-task', reqBody)
    res.sendStatus(200);
});

app.get("/question/submit", async (req: Request, res: Response) => {
    const userId = req.query.userId as string
    const questionId = req.query.question as string
    const timestamp = req.query.timestamp as string

    const submission = await db
                        .select()
                        .from(Submissions)
                        .where(
                            and(
                                eq(Submissions.userId, userId),
                                eq(Submissions.quesId, questionId),
                                gte(Submissions.timestamp, new Date(timestamp))
                            )
    );

    if (submission === null) {
        res.sendStatus(204);
        return;
    }

    res.json(submission);
})

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


