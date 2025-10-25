import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { config } from '@/lib/config';
import { logEvent } from '@/lib/sheets';

export async function POST() { return GET(); }

export async function GET() {
  const rss = config.sourceRss;
  if (!rss) {
    await logEvent('poll', { status: 'no_source' });
    return NextResponse.json({ ok: true, found: 0, note: 'No SOURCE_RSS configured' });
  }
  const parser = new Parser();
  const feed = await parser.parseURL(rss);
  const items = (feed.items || []).slice(0, 3); // limit for demo
  await logEvent('poll', { count: items.length });
  // In production, enqueue jobs in DB; here we just log
  return NextResponse.json({ ok: true, items: items.map(i => ({ title: i.title, link: i.link })) });
}
