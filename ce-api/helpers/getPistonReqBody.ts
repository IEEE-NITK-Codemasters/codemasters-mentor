import type { RunRequestBody } from "../types/RunReqBody.ts";
import type { PistonBody } from "../types/PistonBody.ts";
import { supportedLangsPiston } from "../constants/supportedLangsPiston.ts";

export function getPistonReqBody(body: RunRequestBody) {
  const language = supportedLangsPiston.find((langObj) =>
    langObj.id === body.languageId
  )!;

  const finalBody:PistonBody = {
    language: language.pistonAlias,
    version: language.version,
    files: [
      {
        content: body.code,
      },
    ],
  };

  if (body.stdin) finalBody.stdin = body.stdin;
  if (body.run_timeout) finalBody.run_timeout = body.run_timeout;
  if (body.compile_timeout) finalBody.compile_timeout = body.compile_timeout;
  if (body.compile_memory_limit) finalBody.compile_memory_limit = body.compile_memory_limit;
  if (body.run_memory_limit) finalBody.run_memory_limit = body.run_memory_limit;

  return finalBody;
}
