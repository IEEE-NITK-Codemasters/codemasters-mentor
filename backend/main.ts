// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import { RunRequestBody } from "./types/RunRequestBody.ts"
import {Queue} from 'bullmq'
import IORedis from 'ioredis'

const redis = new IORedis.default();
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;
const queue = new Queue('run-queue', {connection: redis})

app.use(express.json());

app.post("/run", async (req: Request, res: Response) => {
    const reqBody: RunRequestBody = req.body
    await queue.add('run-task',reqBody)
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


