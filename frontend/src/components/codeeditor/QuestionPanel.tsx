import { Difficulty } from "@/enums/difficultyEnum"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransition } from "react";
import LoadingWrapper from "../LoadingWrapper";
import { getSubmissions } from "@/helpers/submissions/getSubmissions";
import { useState } from "react";
import { SubmissionRes } from "@/types/SubmissionRes";
import { SubmissionsPanel } from "./SubmissionsPanel";

interface IProps {
    question: {
      id: number;
      title: string;
      difficulty: Difficulty;
      topics?: string[];
      description: string;
    },
    userId: number;
}

export default function QuestionPanel({question,userId}: IProps) {
    const [isPending, startTransition] = useTransition();
    const [submissions, setSubmissions] = useState<SubmissionRes[]>([]);

    async function handleGetSubmissions() {
        startTransition(async () => {
          try {
            const res = await getSubmissions(question.id, userId);
            const submissions:SubmissionRes[] = await res.json();
            setSubmissions(submissions);
          } catch (err) {
            console.error(err);
          }
        });
    }

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
              <div className="prose dark:prose-invert">

                <Tabs onChange={()=>alert("hello")} defaultValue="description" className="h-[calc(100vh-140px)]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger onClick={handleGetSubmissions} value="submissions">Submissions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <Markdown>{question.description}</Markdown>
                  </TabsContent>
                  <TabsContent value="submissions" className="mt-4">
                    {/* <SubmissionsList /> */}
                    <LoadingWrapper isLoading={isPending}>
                      <SubmissionsPanel submissions={submissions}/>
                    </LoadingWrapper>
                  </TabsContent>
                </Tabs>

                
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