export type SubmitRequestBody = {
    languageId: string;
    code: string;
    stdin?: string; // Optional, defaults to blank string
    run_timeout?: number; // Optional
    compile_timeout?: number; // Optional, defaults to maximum
    compile_memory_limit?: number; // Optional, defaults to maximum or -1 (no limit)
    run_memory_limit?: number; // Optional, defaults to maximum or -1 (no limit)
    userId: string;
    questionId: string;
    expected_output?: string;
    submissionId: number;
};

