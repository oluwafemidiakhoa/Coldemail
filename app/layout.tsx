// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Cold Email SaaS",
  description: "Next-gen AI cold email platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-100">
      <body className="font-sans text-gray-900">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold">Cold Email SaaS</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
