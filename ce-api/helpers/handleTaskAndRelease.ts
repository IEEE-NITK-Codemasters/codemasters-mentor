import { Sema } from "async-sema";
import { createClient } from "redis";
import type { QueueItem } from "../types/queueItem.ts";

type RedisType = ReturnType<typeof createClient>;

export async function handleTaskAndRelease(redis: RedisType, sema: Sema) {
    try {
        console.log('hello');
        const result = await redis.BRPOP('mylist', 0);
        if (result === null) {
            throw new Error("BRPOP returned null");
        }
        console.log(result);

        const stringItem: string = result[1];
        console.log(stringItem);
        const queueItem: QueueItem = JSON.parse(stringItem);
        console.log(queueItem);

        // Do something with the task (fake processing below)
        try {
            const output = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(queueItem)
            });

            if (!output.ok) {
                console.log('not successful');
            }
            const json_output = await output.json();
            console.log(json_output);
        } catch (err) {
            console.log(err);
        }

        sema.release();
    } catch (err) {
        console.error(err);
    }
}
