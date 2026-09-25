import { NextResponse } from 'next/server';
import { DEFAULT_GEMINI_MODEL, CANDIDATE_GEMINI_MODELS } from '@/lib/gemini';

export async function GET() {
  const hasServerKey = Boolean(
    (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '') ||
    (process.env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY.trim() !== '')
  );

  return NextResponse.json({
    status: 'ok',
    hasServerKey,
    model: DEFAULT_GEMINI_MODEL,
    candidateModels: CANDIDATE_GEMINI_MODELS,
    message: hasServerKey
      ? `Server API Key detected (Models: ${CANDIDATE_GEMINI_MODELS.slice(0, 2).join(' / ')} with automatic fallback)`
      : 'Demo Mode Active (Preloaded contracts & intelligent offline analyzer)',
  });
}
