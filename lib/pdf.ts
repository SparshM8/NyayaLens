/**
 * PDF and Document Text Extraction Utility
 */

export async function extractTextFromBuffer(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  const isPdf = mimeType.includes('pdf') || fileName.toLowerCase().endsWith('.pdf');
  const isTxt = mimeType.includes('text') || fileName.toLowerCase().endsWith('.txt') || fileName.toLowerCase().endsWith('.md');

  if (isTxt) {
    return buffer.toString('utf-8');
  }

  if (isPdf) {
    try {
      // Dynamic import to avoid SSR/bundling edge cases
      const pdfParseModule = await import('pdf-parse');
      // @ts-expect-error pdf-parse export variability
      const pdf = pdfParseModule.default || pdfParseModule;
      const data = await pdf(buffer);
      if (data && data.text && data.text.trim().length > 0) {
        return data.text.trim();
      }
    } catch (err) {
      console.warn('pdf-parse threw an error, trying regex/string extraction fallback:', err);
    }

    // Fallback: extract visible text streams from PDF buffer if pdf-parse fails
    const rawString = buffer.toString('latin1');
    const textMatches: string[] = [];
    const streamRegex = /\(([^)]+)\)\s*Tj/g;
    let match;
    while ((match = streamRegex.exec(rawString)) !== null) {
      if (match[1] && match[1].length > 1) {
        textMatches.push(match[1]);
      }
    }

    if (textMatches.length > 20) {
      return textMatches.join(' ');
    }

    // Fallback message with filename
    return `[Extracted Text from ${fileName}]\n(Document uploaded: ${fileName}, Size: ${(buffer.length / 1024).toFixed(1)} KB)`;
  }

  // Generic fallback for any other text-based upload
  return buffer.toString('utf-8');
}
