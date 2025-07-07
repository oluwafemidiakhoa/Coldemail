import { createQueue } from "../utils/bullmq";
import Phantombuster from "phantombuster";

const client = new Phantombuster({
  apiKey: process.env.PHANTOMBUSTER_API_KEY as string,
});

export const linkedInQueue = createQueue("linkedin");

export async function sendLinkedInDM(profileUrl: string, message: string) {
  return client.agents.run({ id: "linkedin-dm", arguments: { profileUrl, message } });
}

linkedInQueue.process(async (job) => {
  const { profileUrl, message } = job.data;
  await sendLinkedInDM(profileUrl, message);
});
