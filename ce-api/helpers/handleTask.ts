import type { QueueItem } from "../types/queueItem.ts";
import type { RedisType } from "../main.ts";

export async function handleTask(redis: RedisType , task:QueueItem) {
    try {

        const keyToOutput: string | undefined = 'run' + task.userId.toString() + task.questionId.toString();
        const output = await fetch(Deno.env.get("PISTON_API_URL") + "/api/v2/piston/execute", {
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

        // Expires in 15 seconds
        await redis.set(keyToOutput, JSON.stringify(json_output), 'EX', 20);

    } catch (err) {
        console.error(err);
    }
}
