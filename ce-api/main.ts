import { createClient } from 'redis'
import {Sema} from 'async-sema' 
import { handleTaskAndRelease } from "./helpers/handleTaskAndRelease.ts"

const redis = createClient()
const maxActiveReq = parseInt(Deno.env.get("MAX_ACTIVE_REQ") || "5")
const sema = new Sema(maxActiveReq)
await redis.connect()

async function startServer() {
  while(true) {

    /*
    * Acquire a semaphore before pulling a task from the queue
    * Release the semaphore after the task is processed
    */

    await sema.acquire();
    handleTaskAndRelease(redis,sema);
  }
}

startServer()

