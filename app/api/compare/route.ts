import { NextRequest, NextResponse } from 'next/server';
import { compareContractsWithGemini } from '@/lib/gemini';
import { SAMPLE_COMPARISON } from '@/lib/comparisonSamples';

export async function POST(req: NextRequest) {
  try {
    const customApiKey = req.headers.get('x-gemini-api-key') || undefined;
    const body = await req.json();
    const useSample = body.useSample;
    const textA = body.textA || body.versionA || '';
    const textB = body.textB || body.versionB || '';
    const nameA = body.nameA || body.titleA || 'Version A';
    const nameB = body.nameB || body.titleB || 'Version B';

    if (useSample) {
      return NextResponse.json(SAMPLE_COMPARISON);
    }

    if (!textA || !textB) {
      return NextResponse.json(
        { error: 'Both Contract A and Contract B text are required for comparison' },
        { status: 400 }
      );
    }

    const comparison = await compareContractsWithGemini(
      textA,
      textB,
      nameA || 'Version A',
      nameB || 'Version B',
      customApiKey
    );

    return NextResponse.json(comparison);
  } catch (error: any) {
    console.error('Error in contract comparison:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to compare contract drafts' },
      { status: 500 }
    );
  }
}
