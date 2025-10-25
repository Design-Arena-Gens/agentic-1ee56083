import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentic Clips Automation',
  description: 'Automated podcast-to-shorts pipeline',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
