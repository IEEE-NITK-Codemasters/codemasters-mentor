import type { Question } from "@/types/question";

export async function getQuestion(id: number): Promise<Question> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/questions/${id}`);
    if (!response.ok) {
        console.error(response)
        throw new Error(`Failed to fetch question with id ${id}: ${response.statusText}`);
    }
    return response.json(); // This will return the parsed `Question` object
}
