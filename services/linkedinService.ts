/**
 * services/linkedinService.ts
 * ---------------------------
 * Enqueues LinkedIn DM jobs and exposes the helper to call
 * Phantombuster’s REST API.
 */

import fetch from "node-fetch";
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL as string);
export const linkedInQueue = new Queue("linkedin", { connection });

const API_KEY = process.env.PHANTOMBUSTER_API_KEY as string;
const AGENT_ID = process.env.PHANTOMBUSTER_LINKEDIN_AGENT_ID as string;

if (!API_KEY || !AGENT_ID) {
  throw new Error(
    "Missing PHANTOMBUSTER_API_KEY or PHANTOMBUSTER_LINKEDIN_AGENT_ID"
  );
}

/**
 * Add a job to the LinkedIn queue
 */
export async function enqueueLinkedInDM(profileUrl: string, message: string) {
  await linkedInQueue.add("sendMessage", { profileUrl, message });
}

/**
 * Direct call to Phantombuster REST API
 */
export async function sendLinkedInDM(profileUrl: string, message: string) {
  const res = await fetch(
    "https://api.phantombuster.com/api/v2/agents/launch",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Phantombuster-Key-1": API_KEY,
      },
      body: JSON.stringify({
        id: AGENT_ID,
        argument: { profileUrl, message },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Phantombuster error ${res.status}: ${res.statusText} — ${text}`
    );
  }

  return res.json();
}
