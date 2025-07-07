import dynamic from 'next/dynamic';

const CopilotChat = dynamic(() => import('./components/CopilotChat'), { ssr: false });

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <CopilotChat />
    </main>
  );
}
