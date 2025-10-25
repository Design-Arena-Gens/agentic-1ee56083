import { NextResponse } from 'next/server';
import { transcribeFromUrl } from '@/lib/transcribe';
import { detectTopClips } from '@/lib/clipDetect';
import { srtFromClip } from '@/lib/subtitles';
import { generateMetadataFromTranscript } from '@/lib/captions';
import { logEvent } from '@/lib/sheets';

export async function POST() { return GET(); }

export async function GET() {
  // Demo: use a public MP3 if provided via ?url=
  const url = process.env.DEMO_AUDIO_URL || 'https://file-examples.com/storage/fe2b34b22dc60e29d1f1e2b/2017/11/file_example_MP3_700KB.mp3';
  const transcript = await transcribeFromUrl(url);
  const clips = detectTopClips(transcript, 60, 2);
  const outputs = [] as any[];
  for (const clip of clips) {
    const srt = srtFromClip(transcript, clip);
    const meta = await generateMetadataFromTranscript(clip.text);
    outputs.push({ clip, srt, meta });
  }
  await logEvent('process', { clips: outputs.length });
  return NextResponse.json({ ok: true, outputs });
}
