import { runBodyDefaults } from "@/lib/constants/runBodyDefaults";
import { supportedLangs } from "@/lib/constants/supportedLangs";
let url = import.meta.env.VITE_BACKEND_URL + '/question/run';

function getLangVersion(language: string){
    return supportedLangs.find(lang => lang.name === language)?.version!;
}

export async function runCode(language: string,stdin:string, code: string, userId: number, questionId: number){
    const body = {
        language,
        version: getLangVersion(language),
        stdin,
        files: [
            { content: code }
        ],
        compile_timeout: runBodyDefaults.compile_timeout,
        run_timeout: runBodyDefaults.run_timeout,
        compile_cpu_time: runBodyDefaults.compile_cpu_time,
        run_cpu_time: runBodyDefaults.run_cpu_time,
        compile_memory_limit: runBodyDefaults.compile_memory_limit,
        run_memory_limit: runBodyDefaults.run_memory_limit,
        userId,
        questionId
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      };

      
    return fetch(url, options)
}
