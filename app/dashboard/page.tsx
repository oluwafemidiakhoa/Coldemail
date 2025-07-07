// app/dashboard/page.tsx
"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
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
  }

  async function handleSend() {
    if (!to.trim() || !subject.trim() || !reply) {
      alert("Please fill in recipient, subject, and have a draft.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body: reply }),
      });
      const json = await res.json();
      if ("success" in json && json.success) {
        alert("Email sent!");
      } else {
        throw new Error(json.error || "Send failed");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">AI Copilot</h2>

      {/* 1. Generate draft */}
      <form onSubmit={handleGenerate} className="space-y-4 mb-6">
        <textarea
          rows={8}
          className="w-full min-h-[180px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          placeholder="Describe the email you need…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow disabled:opacity-50"
        >
          {loading ? "Thinking…" : "Generate Draft"}
        </button>
      </form>

      {/* 2. Show AI response */}
      {reply && (
        <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-2xl font-semibold">Draft</h3>
          <p className="whitespace-pre-wrap">{reply}</p>

          {/* 3. Send email */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="text-xl font-medium">Send This Email</h4>
            <input
              type="email"
              placeholder="Recipient email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring focus:border-blue-300"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send Email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
