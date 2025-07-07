// utils/serper.ts

import fetch from "node-fetch";

export interface SerperResult {
  // adjust based on the API’s response shape
  news?: { title: string; link: string }[];
  [key: string]: any;
}

/**
 * Queries Serper.dev Google Search API for lead intel.
 */
export async function searchLeads(query: string): Promise<SerperResult> {
  if (!process.env.SERPER_API_KEY) {
    throw new Error("SERPER_API_KEY not set");
  }

  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query }),
  });

  if (!res.ok) {
    throw new Error(`Serper error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
