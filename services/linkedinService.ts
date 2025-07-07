/**
 * LinkedIn DM queue + sender
 * Uses BullMQ for background jobs and Phantombuster’s SDK
 */

import { createQueue } from "../utils/bullmq";
import Phantombuster from "phantombuster-sdk";

const client = new Phantombuster({
  apiKey: process.env.PHANTOMBUSTER_API_KEY as string,
});

export const linkedInQueue = createQueue("linkedin");

/** Helper to trigger a Phantombuster agent */
export async function sendLinkedInDM(profileUrl: string, message: string) {
  return client.agents.run({
    id: "linkedin-dm",
    arguments: { profileUrl, message },
  });
}

/** Worker that processes jobs from the queue */
linkedInQueue.process(async (job) => {
  const { profileUrl, message } = job.data as {
    profileUrl: string;
    message: string;
  };
  await sendLinkedInDM(profileUrl, message);
});
