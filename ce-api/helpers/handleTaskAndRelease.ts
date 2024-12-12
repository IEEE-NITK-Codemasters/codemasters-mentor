import { Sema } from "async-sema";
import { createClient } from "redis";
import type { QueueItem } from "../types/queueItem.ts";

type RedisType = ReturnType<typeof createClient>;

export async function handleTaskAndRelease(redis: RedisType , sema: Sema) {
    try {
        const queueItem: QueueItem = await redis.BRPOP("tasks", 0);
        
        // Do something with the task (fake processing below)
        console.log(queueItem);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        sema.release();
    } catch(err) {
        console.error(err);
    }
}