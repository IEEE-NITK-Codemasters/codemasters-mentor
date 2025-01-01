// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import { RunRequestBody } from "./types/RunRequestBody.ts"
import { PistonResponseBody } from "./types/PistonResponseBody.ts";
import { getRunOutputBody } from "./helpers/getRunOutputBody.ts";
import cors from 'cors'
import {Queue} from 'bullmq'
import IORedis from 'ioredis'
import { db } from "./db/db.ts"
import { Submissions } from "@codemasters/db"
import { Questions } from "@codemasters/db";
import { eq, and } from "drizzle-orm";
import questionRoutes from "./routes/questionRoutes.ts";
import type {SubmitRequestBody} from "./types/SubmitRequestBody.ts";
import submissionRoutes from "./routes/submissionRoutes.ts";

const redis = new IORedis.default();
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;
const runQueue = new Queue('run-queue', { connection: redis })
const submitQueue = new Queue('submit-queue', { connection: redis })

app.use(express.json());
app.use(cors())
app.use('/questions', questionRoutes)
app.use('/submissions', submissionRoutes)

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

    const pistonOutput: PistonResponseBody = JSON.parse(outputString)
    const output = getRunOutputBody(pistonOutput)
    await redis.del(key)
    res.json(output)
})

app.post("/question/submit", async (req: Request, res: Response) => {
    const reqBody: SubmitRequestBody = req.body
    const result = await db.select().from(Questions).where(eq(Questions.id, parseInt(reqBody.questionId)));

    reqBody.stdin = result[0].testcase;
    reqBody.expected_output = result[0].expected_output;

    const pendingSubmission =  await db.insert(Submissions).values({
        userId: parseInt(reqBody.userId),
        quesId: parseInt(reqBody.questionId),
        contestId: result[0].contestId,
        status: "pending"
    }).returning({id : Submissions.id})

    reqBody.submissionId = pendingSubmission[0].id
    console.log("pending submission id : ", pendingSubmission[0].id)

    await submitQueue.add('submit-task', reqBody)
    res.json({submissionId: pendingSubmission[0].id});
});

app.get("/question/submit", async (req: Request, res: Response) => {
    const submissionId = req.query.submissionId as string

    const submission = await db
                        .select()
                        .from(Submissions)
                        .where(
                            and(
                                eq(Submissions.id,parseInt(submissionId)),
                            )
                        ).limit(1)

    if(submission[0].status === "pending") {
        res.sendStatus(204)
        return
    }

    res.json(submission[0]);
})

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


