

// src/app/lib/data.ts
import {
  heroData,
  aboutData,
  skillCategories,
  projects,
  experiences,
  education,
  contactData,
} from '../../data/data';

export function getPortfolioContext(): string {
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

  return `PORTFOLIO DATA FOR ${heroData.name.toUpperCase()}
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