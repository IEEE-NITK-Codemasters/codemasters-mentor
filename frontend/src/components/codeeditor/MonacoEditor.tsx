import { Code2 } from "lucide-react"
import { Editor } from "@monaco-editor/react"
import { supportedLangs } from "@/lib/constants/supportedLangs"
import { Dispatch, SetStateAction } from "react"

interface IProps {
    code: string
    language: typeof supportedLangs[0]
    setCode: Dispatch<SetStateAction<string>>
}

export default function MonacoEditor({ code, language, setCode }: IProps) {
    return (
        <div className="h-full p-4 bg-muted/30 dark:text-white">
            <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4" />
                <span className="font-medium">Code Editor</span>
            </div>
            <Editor
                className="w-full min-h-full"
                language={language.monacoAlias}
                theme="vs-dark"
                value={code}
                onChange={(value) => value && setCode(value)}
                options={{
                    //@ts-ignore
                    inlineSuggest: true,
                    //@ts-ignore
                    fontSize: "16px",
                    formatOnType: true,
                    //@ts-ignore
                    autoClosingBrackets: true,
                    minimap: { scale: 10 }
                }}
            />
        </div>
    )
}