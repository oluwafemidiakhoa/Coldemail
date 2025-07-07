// pages/api/ai-copilot.ts

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ reply: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ reply: "Please provide a prompt." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() || "";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res
      .status(500)
      .json({ reply: "Error generating response; check server logs." });
  }
}



