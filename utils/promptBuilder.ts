import { searchLeads } from "./serper";

export async function buildPrompt(company: string, painPoint: string) {
  const intel = await searchLeads(`${company} news`);
  const headline = intel?.news?.[0]?.title || '';
  return \`Write a 2‑paragraph cold email to \${company}. Reference "\${headline}" if available. Highlight pain point: \${painPoint}. End with CTA.\`;
}
