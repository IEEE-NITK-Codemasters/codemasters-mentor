import { Sema } from "async-sema";
import { createClient } from "redis";
import type { QueueItem } from "../types/queueItem.ts";
import type { stringOrUndefined } from "../types/stringOrUndefined.ts";

type RedisType = ReturnType<typeof createClient>;

export async function handleTaskAndRelease(redis: RedisType, sema: Sema) {
    try {
        
        const result = await redis.BRPOP('mylist', 0);
        if (result === null) {
            throw new Error("BRPOP returned null");
        }
        console.log(result);

        const stringItem: string = result.element;
        console.log(stringItem);
        const queueItem: QueueItem = JSON.parse(stringItem);
        console.log(queueItem);

        const keyToOutput: stringOrUndefined = queueItem.userId;
        
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

            await redis.set(keyToOutput, JSON.stringify(json_output));
            console.log(json_output);
        } catch (err) {
            console.log(err);
        }

        
    } catch (err) {
        console.error(err);
    }
    finally {
        sema.release();
    }
}
