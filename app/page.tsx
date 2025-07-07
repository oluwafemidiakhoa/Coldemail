// app/page.tsx
export default function HomePage() {
  return (
    <section className="text-center py-20">
      <h2 className="text-4xl font-extrabold mb-4">
        AI-Powered Cold Email Campaigns
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Draft, send, and track personalized cold emails—supercharged by AI.
      </p>
      <a
        href="/dashboard"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        Try the AI Copilot →
      </a>
    </section>
  );
}
