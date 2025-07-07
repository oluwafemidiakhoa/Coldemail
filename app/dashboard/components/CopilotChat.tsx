'use client';
import { useState } from 'react';

export default function CopilotChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const send = async () => {
    if (!input) return;
    const res = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setMessages([...messages, data.email]);
    setInput('');
  };

  return (
    <div className="border rounded-xl p-4 space-y-2">
      <h2 className="font-semibold">AI Copilot</h2>
      <div className="space-y-1 max-h-60 overflow-y-auto">
        {messages.map((m, i) => (
          <p key={i} className="text-sm bg-gray-100 rounded p-2">{m}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2 text-sm"
          placeholder="Ask the copilot..."
        />
        <button onClick={send} className="px-3 py-2 bg-black text-white text-sm rounded">
          Send
        </button>
      </div>
    </div>
  );
}
