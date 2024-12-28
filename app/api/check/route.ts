import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Fetch the webpage content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch the webpage');
    }
    const html = await response.text();

    // Extract text content from HTML (basic implementation)
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Use OpenAI to analyze the text
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional editor. Analyze the following text for spelling and grammar mistakes. Provide a clear, concise report of any issues found.',
        },
        {
          role: 'user',
          content: textContent.substring(0, 4000), // Limit text length
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({
      results: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze the webpage' },
      { status: 500 }
    );
  }
}