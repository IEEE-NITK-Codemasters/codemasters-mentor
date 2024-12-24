import type { RunOutput } from "../types/RunOutput.ts";
import type { PistonResponseBody } from "../types/PistonResponeBody.ts";
<<<<<<< HEAD
=======

>>>>>>> main
export function getRunOutputBody(pistonOutput: PistonResponseBody): RunOutput {
    const runOutput: RunOutput = {
        language: pistonOutput.language,
        run: {
            stdout: pistonOutput.run.code === 0 ? pistonOutput.run.stdout : pistonOutput.run.stderr,
            code: pistonOutput.run.code
        }
    };
<<<<<<< HEAD
=======

>>>>>>> main
    if (pistonOutput.compile) {
        runOutput.compile = {
            stdout: pistonOutput.compile.code === 0 ? pistonOutput.compile.stdout : pistonOutput.compile.stderr,
            code: pistonOutput.compile.code
        };
    }
<<<<<<< HEAD
=======

>>>>>>> main
    return runOutput;
}