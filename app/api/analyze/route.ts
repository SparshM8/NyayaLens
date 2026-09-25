import { NextRequest, NextResponse } from 'next/server';
import { analyzeDocumentWithGemini } from '@/lib/gemini';
import { extractTextFromBuffer } from '@/lib/pdf';
import { SAMPLE_DOCUMENTS } from '@/lib/sampleDocuments';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    const customApiKey = req.headers.get('x-gemini-api-key') || undefined;

    let text = '';
    let fileName = 'Legal_Document.pdf';
    let sampleId: string | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      sampleId = formData.get('sampleId') as string | null;

      if (sampleId) {
        const found = SAMPLE_DOCUMENTS.find(s => s.id === sampleId);
        if (found) {
          return NextResponse.json(found.analysis);
        }
      }

      if (!file) {
        return NextResponse.json(
          { error: 'No file or document content provided' },
          { status: 400 }
        );
      }

      fileName = file.name;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      text = await extractTextFromBuffer(buffer, file.type, file.name);
    } else {
      const body = await req.json();
      sampleId = body.sampleId || null;

      if (sampleId) {
        const found = SAMPLE_DOCUMENTS.find(s => s.id === sampleId);
        if (found) {
          return NextResponse.json(found.analysis);
        }
      }

      text = body.text || '';
      fileName = body.fileName || 'Legal_Document.txt';
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Document appears empty or text could not be extracted.' },
        { status: 400 }
      );
    }

    const analysis = await analyzeDocumentWithGemini(text, fileName, customApiKey);
    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Error analyzing document:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process and analyze legal document' },
      { status: 500 }
    );
  }
}
