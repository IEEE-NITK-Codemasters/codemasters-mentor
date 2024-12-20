import { supportedLangs } from "@/lib/constants/supportedLangs";
import type { Question } from "@/types/question";
let url = import.meta.env.VITE_BACKEND_URL + '/question/run';

function getLangVersion(language: string){
    return supportedLangs.find(lang => lang.name === language)?.version!;
}

export async function runCode(language: string,stdin:string, code: string, userId: number, question: Question){
    const body = {
        language,
        version: getLangVersion(language),
        stdin,
        files: [
            { content: code }
        ],
        compile_timeout : question.compile_timeout,
        run_timeout: question.run_timeout,
        compile_cpu_time: question.compile_cpu_time,
        run_cpu_time: question.run_cpu_time,
        compile_memory_limit: question.compile_memory_limit,
        run_memory_limit: question.run_memory_limit,
        userId,
        questionId : question.id
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      };

      
    return fetch(url, options)
}
