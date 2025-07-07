"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setReply(null);

    try {
      const res = await fetch("/api/ai-copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const json = await res.json();
      setReply(json.reply);
    } catch {
      setReply("Error generating response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">AI Copilot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={4}
          className="w-full p-3 border rounded focus:ring"
          placeholder="What can I do?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Thinking…" : "Send"}
        </button>
      </form>

      {reply && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Response</h2>
          <div className="whitespace-pre-wrap p-4 bg-gray-50 rounded">
            {reply}
          </div>
        </section>
      )}
    </main>
  );
}
