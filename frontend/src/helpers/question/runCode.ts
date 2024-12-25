import type { Question } from "@/types/question";
import { CodeRequestBody } from "@/types/CodeRequestBody";
let url = import.meta.env.VITE_BACKEND_URL + '/question/run';

export async function runCode(languageId: string,stdin:string, code: string, userId: number, question: Question){
    const body:CodeRequestBody = {
        languageId,
        stdin,
        code,
        compile_timeout : question.compile_timeout,
        run_timeout: question.run_timeout,
        compile_memory_limit: question.compile_memory_limit,
        run_memory_limit: question.run_memory_limit,
        userId: userId.toString(),
        questionId : question.id.toString()
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      };

      
    return fetch(url, options)
}
