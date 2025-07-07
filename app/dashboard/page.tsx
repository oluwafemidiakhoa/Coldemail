// pages/dashboard.tsx
import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
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
      const body = await res.json();
      setReply(body.reply);
    } catch (err) {
      console.error(err);
      setReply("❌ Something went wrong. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Cold Email SaaS — AI Copilot</h1>
      <form onSubmit={handleSend}>
        <textarea
          rows={4}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          placeholder="What can I do?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Thinking…" : "Send"}
        </button>
      </form>

      {reply && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#f3f3f3",
            whiteSpace: "pre-wrap",
          }}
        >
          {reply}
        </div>
      )}
    </div>
  );
}
