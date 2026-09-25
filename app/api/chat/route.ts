import { NextRequest, NextResponse } from 'next/server';
import { chatWithDocument } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const customApiKey = req.headers.get('x-gemini-api-key') || undefined;
    const body = await req.json();
    const question = body.question || body.query || body.prompt;
    const documentText = body.documentText || body.context || body.text || '';
    const chatHistory = body.chatHistory || body.history || [];

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    if (!documentText || documentText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Document context is missing' },
        { status: 400 }
      );
    }

    const response = await chatWithDocument(
      documentText,
      chatHistory,
      question,
      customApiKey
    );

    return NextResponse.json({
      text: response.text,
      answer: response.text,
      relevantClauses: response.relevantClauses,
      citations: response.relevantClauses,
      whatToVerify: response.whatToVerify,
      keyTakeaways: [response.whatToVerify],
    });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to answer question grounded in document' },
      { status: 500 }
    );
  }
}
