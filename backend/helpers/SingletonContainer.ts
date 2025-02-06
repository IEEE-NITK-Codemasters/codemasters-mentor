import IORedis from 'ioredis'
import { Queue } from "bullmq";

export class SingletonContainer{
    static redis: IORedis.Redis
    static runQueue: Queue
    static submitQueue: Queue

    static init() {
        SingletonContainer.getRedis();
        SingletonContainer.getRunQueue();
        SingletonContainer.getSubmitQueue()
    }

    static getRedis(): IORedis.Redis {
        if (!SingletonContainer.redis) {
            SingletonContainer.redis = new IORedis.default();
        }
        return SingletonContainer.redis;
    }

    static getRunQueue(): Queue {
        if (!SingletonContainer.runQueue) {
            SingletonContainer.runQueue = new Queue('run-queue', { connection: SingletonContainer.getRedis() })
        }
        return SingletonContainer.runQueue;
    }

    static getSubmitQueue(): Queue {
        if (!SingletonContainer.submitQueue) {
            SingletonContainer.submitQueue = new Queue('submit-queue', { connection: SingletonContainer.getRedis() })
        }
        return SingletonContainer.submitQueue;
    }
}