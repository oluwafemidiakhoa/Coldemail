// utils/serper.ts

import fetch from "node-fetch";

export interface SerperResult {
  news?: { title: string; link: string }[];
  [key: string]: any;
}

/**
 * Queries Serper.dev Google Search API for lead intel.
 */
export async function searchLeads(query: string): Promise<SerperResult> {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    throw new Error("SERPER_API_KEY not set");
  }

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query }),
  });

  if (!res.ok) {
    // always throw on bad status
    const text = await res.text();
    throw new Error(`Serper error ${res.status}: ${text}`);
  }

  // Now we’re guaranteed to return SerperResult
  const data = (await res.json()) as SerperResult;
  return data;
}
