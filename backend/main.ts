// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import { RunRequestBody } from "./types/RunRequestBody.ts"
import { RunResponseBody } from "./types/RunResponseBody.ts";
import cors from 'cors'
import {Queue} from 'bullmq'
import IORedis from 'ioredis'

const redis = new IORedis.default();
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;
const queue = new Queue('run-queue', {connection: redis})

app.use(express.json());
app.use(cors())

app.post("/question/run", async (req: Request, res: Response) => {
    const reqBody: RunRequestBody = req.body
    await queue.add('run-task',reqBody)
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

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


