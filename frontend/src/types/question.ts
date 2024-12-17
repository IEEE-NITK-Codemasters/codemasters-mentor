import type { Difficulty } from "@/enums/difficultyEnum";

export type Question = {
    title: string;
    difficulty: Difficulty;
    topics: string[];
    description: string;
}