import Link from 'next/link';
import { Suspense } from 'react';
import Dashboard from '@/components/Dashboard';

export default function HomePage() {
  return (
    <main className="container">
      <h1>Agentic Clips</h1>
      <p className="card">Hands-free podcast → short-form clips automation.</p>
      <div className="grid">
        <div className="card">
          <h3>Controls</h3>
          <div style={{display:'flex', gap:8}}>
            <form action="/api/cron/poll" method="post"><button>Poll Now</button></form>
            <form action="/api/cron/process" method="post"><button className="secondary">Process Now</button></form>
            <form action="/api/cron/schedule" method="post"><button className="secondary">Schedule Uploads</button></form>
          </div>
        </div>
        <div className="card">
          <h3>Docs</h3>
          <ul>
            <li><Link href="/api/health">API Health</Link></li>
            <li><Link href="https://developers.google.com/youtube/v3" target="_blank">YouTube API</Link></li>
            <li><Link href="https://cloudinary.com/documentation" target="_blank">Cloudinary</Link></li>
          </ul>
        </div>
      </div>
      <Suspense><Dashboard/></Suspense>
    </main>
  );
}
