import type { QueueItem } from "../types/queueItem.ts";
import { SubmissionType } from "../types/submissionType.ts";
import { db } from "../db/db.ts"
import { Submissions } from "../db/schema.ts" 

export async function handleSubmitTask(task:QueueItem) {
    try {

        const expected_output: string | undefined = task.expected_output?.toString();
        console.log(task);
         
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

        console.log(json_output);

        let submission: SubmissionType = {
            userId: Number(task.userId),
            quesId: Number(task.questionId),
            timestamp: new Date(),
            status: '',
            output: ''
        }
        if (json_output.compile && json_output.compile.code !== 0) {
            submission['output'] = (json_output.compile.stderr);
            submission['status'] = "compile_time_error";
        }
        else if (json_output.run.code !== 0) {
            submission['output'] = (json_output.run.stderr);
            submission['status'] = "run_time_error";
        }
        else {
            submission['output'] = (json_output.run.stdout);
            if (expected_output === submission['output']) {
                submission['status'] = "accepted";
            }
            else {
                submission['status'] = "rejected";
            }
        }
        
        console.log(submission);
        await db.insert(Submissions).values(submission);

    } catch (err) {
        console.error(err);
    }
}
