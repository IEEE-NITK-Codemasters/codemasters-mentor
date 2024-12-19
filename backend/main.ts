// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "express";
import { RunRequestBody } from "./types/RunRequestBody.ts"
import { createClient } from 'redis'

const redis = createClient()
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;

await redis.connect();

app.use(express.json());

app.post("/run", async (req: Request, res: Response) => {
    const userId: string = "jflaj";
    let RequestBody: RunRequestBody = req.body;

    RequestBody['userId'] = userId;
    await redis.LPUSH( 'mylist', JSON.stringify(RequestBody) );

    console.log(RequestBody)
    res.status(200).send(userId);
});



app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


