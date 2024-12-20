/*
language: Name (not alias) of the runtime used
version: Version of the used runtime
run: Results from the run stage
run.stdout: stdout from run stage process
run.stderr: stderr from run stage process
run.output: stdout and stderr combined in order of data from run stage process
run.code: Exit code from run process, or null if signal is not null
run.signal: Signal from run process, or null if code is not null
compile (optional): Results from the compile stage, only provided if the runtime has a compile stage
compile.stdout: stdout from compile stage process
compile.stderr: stderr from compile stage process
compile.output: stdout and stderr combined in order of data from compile stage process
compile.code: Exit code from compile process, or null if signal is not null
compile.signal: Signal from compile process, or null if code is not null
*/ 

export type RunResponseBody = {
    language: string;
    version: string;
    run: {
        stdout: string; 
        stderr: string; 
        output: string;
        code: number;
        signal: string;
    }
    compile?: {
        stdout: string;
        stderr: string;
        output: string;
        code: number;
        signal: string;
    }
}