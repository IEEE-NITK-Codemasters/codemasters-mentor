type File = {
    name?: string; // Optional
    content: string;
    encoding?: "base64" | "hex" | "utf8"; // Optional, defaults to utf8
};

export type RunRequestBody = {
    language: string;
    version: string;
    files: File[];
    stdin?: string; // Optional, defaults to blank string
    args?: string[]; // Optional, defaults to none
    run_timeout?: number; // Optional
    compile_timeout?: number; // Optional, defaults to maximum
    compile_memory_limit?: number; // Optional, defaults to maximum or -1 (no limit)
    run_memory_limit?: number; // Optional, defaults to maximum or -1 (no limit)
    userId: string;
    questionId: string;
};

