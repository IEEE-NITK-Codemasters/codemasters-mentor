import type { QueueItem } from "../types/queueItem.ts";
import type { RedisType } from "../main.ts";

export async function handleTask(redis: RedisType , task:QueueItem) {
    try {

        const keyToOutput: string | undefined = task.userId;
        const output = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if (!output.ok) {
            throw new Error("Error in fetching output")
        }
        const json_output = await output.json();
        await redis.set(keyToOutput, JSON.stringify(json_output));
        console.log(json_output)

    } catch (err) {
        console.error(err);
    }
}
