import type { Difficulty } from "@/enums/difficultyEnum";

export type Question = {
    id: number;
    title: string;
    difficulty: Difficulty;
    topics?: string[];
    description: string;
}