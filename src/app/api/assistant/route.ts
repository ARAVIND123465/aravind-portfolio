// src/app/api/assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getPortfolioContext } from "../../lib/data";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `
You are a helpful AI assistant for Aravindhan S, embedded in his personal portfolio website.

INSTRUCTIONS:
• Your sole purpose is to answer questions about Aravindhan based on the verified portfolio data provided below.
• Be conversational, friendly, and professional.
• If a question cannot be answered from the provided context, politely state that you do not have that information.
• Never fabricate information.
• Always refer to Aravindhan in the third person (e.g., "he," "Aravindhan," or "his").
• Keep responses concise and to the point (under 150 words).
• Use markdown for formatting when it improves readability.

Here is the portfolio context you must use to answer questions:

${getPortfolioContext()}
`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] }: { message: string; history: ChatMessage[] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((msg) => ({ role: msg.role, content: msg.content })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
       // Changed to a different, stable model
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const aiResponse = completion.choices?.[0]?.message?.content ?? "I am unable to answer that at the moment.";

    return NextResponse.json({ answer: aiResponse });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    if (error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again shortly." },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
