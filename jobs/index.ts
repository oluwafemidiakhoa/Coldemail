/**
 * jobs/index.ts
 * -------------
 * Starts all BullMQ workers, including LinkedIn DM processing.
 */

import { createWorker } from "../utils/bullmq";
import { analyzeDomainHealth } from "../workers/deliverability";
import { warmupProcessor } from "../workers/warmup";
import { sendLinkedInDM } from "../services/linkedinService";

// Deliverability health worker
createWorker("deliverability", analyzeDomainHealth);

// Domain warm-up worker
createWorker("warmup", warmupProcessor);

// LinkedIn DM worker
createWorker("linkedin", async (job) => {
  const { profileUrl, message } = job.data as {
    profileUrl: string;
    message: string;
  };
  await sendLinkedInDM(profileUrl, message);
});

console.log("All queue workers running...");
