import { Worker } from 'bullmq';
import type { Job } from "bullmq";
import IORedis from 'ioredis'
import { handleTask } from "./helpers/handleTask.ts";

const redis = new IORedis.default({maxRetriesPerRequest:null});
export type RedisType = typeof redis

const worker = new Worker(
  'run-queue',
  async (job:Job) => {
    await handleTask(redis,job.data);
  },
  { connection: redis,
    concurrency: parseInt(Deno.env.get("MAX_ACTIVE_REQS") || "5")
   }
);

worker.on('completed', job => {
  console.log(`Job ${job.id} has been completed`);
});
