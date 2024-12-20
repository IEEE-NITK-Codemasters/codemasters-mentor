import { Difficulty } from "@/enums/difficultyEnum"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area";

interface IProps {
    question: {
      id: number;
      title: string;
      difficulty: Difficulty;
      topics?: string[];
      description: string;
    }
}

export default function QuestionPanel({question}: IProps) {

    return (
        <div className="h-screen p-6">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold dark:text-white">{question.title}</h1>
              <Badge 
                variant="secondary" 
                className={getDifficultyColor(question.difficulty)}
              >
                {question.difficulty}
              </Badge>
            </div>
            <div className="flex gap-2 mb-6">
              {question.topics?.map((topic) => (
                <Badge key={topic} variant="outline">
                  {topic}
                </Badge>
              ))}
            </div>
            <ScrollArea className="h-[calc(100vh-140px)]">
              <div className="whitespace-pre-wrap dark:text-white">
                {question.description}
              </div>
            </ScrollArea>
          </div>
    )

}

function getDifficultyColor(difficulty: Difficulty) {
    switch (difficulty) {
      case Difficulty.Easy:
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case Difficulty.Medium:
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case Difficulty.Hard:
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
    }
  }