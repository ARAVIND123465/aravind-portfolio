// src/app/api/assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  heroData,
  aboutData,
  skillCategories,
  projects,
  experiences,
  education,
  contactData,
} from "../../../data/data";

// ── Build a rich system prompt from data.ts ──────────────────

function buildSystemPrompt(): string {
  const skills = skillCategories
    .map((c) => `  • ${c.category}: ${c.skills.join(", ")}`)
    .join("\n");

  const projectList = projects
    .map(
      (p) =>
        `  • ${p.title} (${p.year}) — ${p.longDescription}\n    Tags: ${p.tags.join(", ")}\n    GitHub: ${p.githubUrl}${p.liveUrl ? `\n    Live: ${p.liveUrl}` : ""}`
    )
    .join("\n\n");

  const experienceList = experiences
    .map(
      (e) =>
        `  • ${e.role} @ ${e.company} (${e.period}, ${e.location})\n    ${e.bullets.join("\n    ")}`
    )
    .join("\n\n");

  const educationList = education
    .map((e) => `  • ${e.degree} — ${e.institution} (${e.period}) | CGPA: ${e.cgpa}`)
    .join("\n");

  return `You are an AI assistant embedded in ${heroData.name}'s personal portfolio website.
Your sole purpose is to answer questions about ${heroData.name} based on the verified data below.
Be conversational, friendly, and concise. If something isn't covered in the data, say so honestly.
Never fabricate information. Always refer to ${heroData.name} in the third person or use "he/his".

═══════════════════════════════════
  PORTFOLIO DATA FOR ${heroData.name.toUpperCase()}
═══════════════════════════════════

── IDENTITY ──
Name:     ${heroData.name}
Tagline:  ${heroData.tagline}
Bio:      ${heroData.subTagline}
Status:   ${heroData.badge}

── ABOUT ──
${aboutData.bio.join("\n\n")}

Highlights:
${aboutData.highlights.map((h) => `  • ${h.label}: ${h.value}`).join("\n")}

── SKILLS ──
${skills}

── PROJECTS ──
${projectList}

── EXPERIENCE ──
${experienceList}

── EDUCATION ──
${educationList}

── CONTACT ──
Email:    ${contactData.email}
Phone:    ${contactData.phone}
Location: ${contactData.location}
GitHub:   ${contactData.socials.find((s) => s.platform === "GitHub")?.url ?? "N/A"}
LinkedIn: ${contactData.socials.find((s) => s.platform === "LinkedIn")?.url ?? "N/A"}
`;
}

// ── Message type ─────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ── POST handler ─────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] }: { message: string; history: ChatMessage[] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Build message history for multi-turn context
    const messages: ChatMessage[] = [
      ...history.slice(-10), // keep last 10 turns to stay within context limits
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 512,
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json(
        { error: "AI service unavailable. Please try again later." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const answer =
      data.content?.find((block: { type: string }) => block.type === "text")?.text ??
      "I couldn't generate a response. Please try again.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Assistant route error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
