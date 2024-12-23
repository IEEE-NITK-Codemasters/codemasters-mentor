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
import { runCode } from '@/helpers/question/runCode';
import { getRunOutput } from '@/helpers/question/getRunOutput';
import { useTransition } from 'react';
import LoadingWrapper from '@/components/LoadingWrapper';
import { RunOutput } from '@/types/RunOutput';

const sampleQuestion: Question = {
  title: "Two Sum",
  id: 1,
  difficulty: Difficulty.Easy,
  compile_timeout: 10000,
  run_timeout: 3000,
  compile_cpu_time: 10000,
  run_cpu_time: 3000,
  compile_memory_limit: -1,
  run_memory_limit: -1,
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
  const [isPending, startTransition] = useTransition();

  async function handleRun() {
    startTransition(async () => {
      try {
        await runCode(language.id, input, code, 1, sampleQuestion);
        await getOutput();
      } catch(err) {
        console.error(err);
      }
    })
  }

  async function getOutput() {
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await getRunOutput(1, sampleQuestion.id);
      if(response.status === 204) continue

      const data:RunOutput = await response.json();
      if(data.compile?.code === 1) setOutput(data.compile.stdout);
      else setOutput(data.run.stdout);
      return // Break the loop and return
    }

    setOutput('Timeout Error: Code took too long to execute, Please Try again Later');
  }

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

              <Button disabled={isPending} onClick={handleRun} variant="default" className="gap-2">
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

                  <LoadingWrapper isLoading={isPending} className='h-full'>
                    <div className="p-4 dark:text-white h-full">
                      <div className="font-medium mb-2">Output</div>
                      <Textarea
                        value={output}
                        readOnly
                        className="h-[calc(100%-28px)] bg-muted"
                        placeholder="Output will appear here..."
                      />
                    </div>
                  </LoadingWrapper>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}