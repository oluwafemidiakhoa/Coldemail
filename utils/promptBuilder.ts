// utils/promptBuilder.ts

import { searchLeads } from "./serper";

export interface PromptOptions {
  companyName: string;
  painPoint: string;
}

export async function buildPrompt({
  companyName,
  painPoint,
}: PromptOptions): Promise<string> {
  // Fetch the latest news headlines for the company
  const intel = await searchLeads(`${companyName} recent news`);
  const headline = intel.news?.[0]?.title ?? "";

  // Construct a two-paragraph cold-email prompt
  return `
Write a concise, friendly two-paragraph B2B cold email to ${companyName}. 
In the first paragraph, open by referencing this recent headline: "${headline}". 
In the second paragraph, address the pain point: "${painPoint}", and close with a clear call-to-action.
  `.trim();
}
