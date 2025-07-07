import { createWorker } from "../utils/bullmq";
import { analyzeDomainHealth } from "../workers/deliverability";
import { warmupProcessor } from "../workers/warmup";

createWorker("deliverability", analyzeDomainHealth);
createWorker("warmup", warmupProcessor);

console.log("Queue workers running...");
