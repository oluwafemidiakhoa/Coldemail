import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL as string);

export function createQueue(name: string) {
  return new Queue(name, { connection });
}

export function createWorker(name: string, processor: any) {
  return new Worker(name, processor, { connection });
}
