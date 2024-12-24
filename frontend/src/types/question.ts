import type { Difficulty } from "@/enums/difficultyEnum";

export type Question = {
    id: number;
    title: string;
    difficulty: Difficulty;
    topics?: string[];
    description: string;
    compile_timeout: number,
    run_timeout: number,
    compile_cpu_time: number,
    run_cpu_time: number,
    compile_memory_limit: number,
    run_memory_limit: number
}