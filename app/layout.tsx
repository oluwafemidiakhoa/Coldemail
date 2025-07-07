// app/layout.tsx

import './globals.css';

export const metadata = {
  title: 'Cold Email SaaS',
  description: 'AI-powered cold outreach platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-white text-gray-800">
        {children}
      </body>
    </html>
  );
}
