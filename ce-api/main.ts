import { Worker } from 'bullmq';
import type { Job } from "bullmq";
import IORedis from 'ioredis'
import { handleRunTask } from "./helpers/handleRunTask.ts";
import { handleSubmitTask } from "./helpers/handleSubmitTask.ts";

const redis = new IORedis.default({maxRetriesPerRequest:null});
export type RedisType = typeof redis

const workerToRun = new Worker(
  'run-queue',
  async (job:Job) => {
    await handleRunTask(redis,job.data);
  },
  { connection: redis,
    concurrency: parseInt(Deno.env.get("MAX_ACTIVE_REQ") || "5")
   }
);

const workerToSubmit = new Worker(
  'submit-queue',
  async (job: Job) => {
    await handleSubmitTask(job.data);
  },
  {
    connection: redis,
    concurrency: parseInt(Deno.env.get("MAX_ACTIVE_REQ") || "5")
  }
)

workerToRun.on('completed', job => {
  console.log(`Job ${job.id} has been completed`);
});

workerToSubmit.on('completed', job => {
  console.log(`Job ${job.id} has been completed`);
});
