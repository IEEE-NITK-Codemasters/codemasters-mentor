import { useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, Send, History } from 'lucide-react';
import QuestionPanel from '@/components/codeeditor/QuestionPanel';
import type { Question } from '@/types/question';
import { Difficulty } from '@/enums/difficultyEnum';
import { supportedLangs } from '@/lib/constants/supportedLangs';
import SelectLang from '@/components/codeeditor/SelectLanguage';
import MonacoEditor from '@/components/codeeditor/MonacoEditor';

const sampleQuestion: Question = {
  title: "Two Sum",
  difficulty: Difficulty.Easy,
  topics: ["Array", "Hash Table"],
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]`
};

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<typeof supportedLangs[0]>(supportedLangs[0]);

  return (
    <div className="h-screen w-screen bg-background">
      <ResizablePanelGroup direction="horizontal">
        {/* Question Panel */}
        <ResizablePanel defaultSize={40}>
          <QuestionPanel question={sampleQuestion} />
        </ResizablePanel>

        <ResizableHandle withHandle/>

        {/* Code Editor Panel */}
        <ResizablePanel defaultSize={60}>
          <div className="h-screen flex flex-col">
            {/* Buttons */}
            <div className="p-4 border-b flex gap-2 dark:text-white">

              <SelectLang setLang={setLanguage} />

              <Button variant="default" className="gap-2">
                <Play className="w-4 h-4" />
                Run
              </Button>

              <Button variant="secondary" className="gap-2">
                <Send className="w-4 h-4" />
                Submit
              </Button>

              <Button variant="secondary" className="gap-2">
                <History className="w-4 h-4" />
                Submissions
              </Button>
            </div>

            {/* Code Editor */}
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60}>
                <MonacoEditor code={code} language={language} setCode={setCode} />
              </ResizablePanel>

              <ResizableHandle withHandle/>

              <ResizablePanel defaultSize={40}>
                {/* Input Panel */}
                <div className="h-full grid grid-cols-2 divide-x dark:text-white">
                  <div className="p-4">
                    <div className="font-medium mb-2">Input</div>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="h-[calc(100%-28px)]"
                      placeholder="Enter input..."
                    />
                  </div>

                  {/* Output Panel */}
                  <div className="p-4 dark:text-white">
                    <div className="font-medium mb-2">Output</div>
                    <Textarea
                      value={output}
                      readOnly
                      className="h-[calc(100%-28px)] bg-muted"
                      placeholder="Output will appear here..."
                    />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}