import { SubmitRequestBody } from "../types/SubmitRequestBody.ts";
import { db } from "../db/db.ts"
import { Submissions } from "@codemasters/db" 
import { InferInsertModel } from "drizzle-orm";
import { getPistonReqBody } from "./getPistonReqBody.ts";
import { eq } from "drizzle-orm";

type TSubmission = InferInsertModel<typeof Submissions>;

export async function handleSubmitTask(task:SubmitRequestBody) {
    try {

        const expected_output: string | undefined = task.expected_output?.toString();
         
        const output = await fetch(Deno.env.get("PISTON_API_URL") + "/api/v2/piston/execute", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getPistonReqBody(task))
        });
        if (!output.ok) {
            throw new Error("Error in fetching output")
        }
        const json_output = await output.json();

        const submission: TSubmission = {
            id: task.submissionId,
            userId: Number(task.userId),
            quesId: Number(task.questionId),
            output: ''
        }
        if (json_output.compile && json_output.compile.code !== 0) {
            submission['output'] = (json_output.compile.output);
            submission['status'] = "compile_time_error";
        }
        else if (json_output.run.code !== 0) {
            submission['output'] = (json_output.run.output);
            submission['status'] = "run_time_error";
        }
        else {
            submission['output'] = (json_output.run.output);
            if (expected_output === submission['output']) {
                submission['status'] = "accepted";
            }
            else {
                submission['status'] = "rejected";
            }
        }
        
        await db
        .update(Submissions)
        .set({status: submission.status,output: submission.output})
        .where(eq(Submissions.id, task.submissionId));

    } catch (err) {
        console.error(err);
    }
}
