export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Cold Email SaaS</h1>
      <p className="mt-4 text-gray-600">
        Head over to{' '}
        <a href="/dashboard" className="text-blue-600 underline">
          Dashboard
        </a>{' '}
        to get started.
      </p>
    </main>
  );
}
