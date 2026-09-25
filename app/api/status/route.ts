import { NextResponse } from 'next/server';
import { DEFAULT_GEMINI_MODEL } from '@/lib/gemini';

export async function GET() {
  const hasServerKey = Boolean(
    (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') ||
    (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY.trim() !== '')
  );

  return NextResponse.json({
    status: 'ok',
    hasServerKey,
    model: DEFAULT_GEMINI_MODEL,
    message: hasServerKey
      ? `Server API Key detected (.env configured with ${DEFAULT_GEMINI_MODEL})`
      : 'Demo Mode Active (Preloaded contracts & intelligent offline analyzer)',
  });
}
