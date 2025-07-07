// pages/api/ai-copilot.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ reply: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ reply: "Please provide a prompt." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    const reply = completion.data.choices[0]?.message?.content ?? "";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ reply: "Error generating response—check your logs." });
  }
}
