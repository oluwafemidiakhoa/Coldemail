import type { NextApiRequest, NextApiResponse } from "next";
import { linkedInQueue } from "../../services/linkedinService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { profileUrl, message } = req.body as { profileUrl: string; message: string };
  await linkedInQueue.add("linkedin", { profileUrl, message });
  res.status(200).json({ queued: true });
}
