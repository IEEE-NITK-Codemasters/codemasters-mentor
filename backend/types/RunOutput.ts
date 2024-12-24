export type RunOutput = {
    language: string;
    run: {
        stdout: string; 
        code: number;
    }
    compile?: {
        stdout: string;
        code: number;
    }
}