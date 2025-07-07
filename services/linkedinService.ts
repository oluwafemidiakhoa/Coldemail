/**
 * LinkedIn DM queue + sender
 * Uses BullMQ for background jobs and Phantombuster’s REST API.
 */

import fetch from "node-fetch";
import { createQueue } from "../utils/bullmq";

const API_KEY = process.env.PHANTOMBUSTER_API_KEY as string;
const AGENT_ID = process.env.PHANTOMBUSTER_LINKEDIN_AGENT_ID as string;

if (!API_KEY || !AGENT_ID) {
  throw new Error(
    "Missing PHANTOMBUSTER_API_KEY or PHANTOMBUSTER_LINKEDIN_AGENT_ID in environment"
  );
}

export const linkedInQueue = createQueue("linkedin");

/**
 * Enqueue a LinkedIn DM job
 */
export async function sendLinkedInDM(profileUrl: string, message: string) {
  const res = await fetch("https://api.phantombuster.com/api/v2/agents/launch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Phantombuster-Key-1": API_KEY,
    },
    body: JSON.stringify({
      id: AGENT_ID,
      argument: {
        profileUrl,
        message,
      },
      // output: "result-object", // optional
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(
      `Phantombuster API error ${res.status}: ${res.statusText} — ${err}`
    );
  }

  return res.json();
}

/**
 * Worker processor: pulls jobs off the queue and calls the API.
 */
linkedInQueue.process(async (job) => {
  const { profileUrl, message } = job.data as {
    profileUrl: string;
    message: string;
  };
  await sendLinkedInDM(profileUrl, message);
});
