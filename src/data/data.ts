// data/data.ts
import { Github, Linkedin, Mail, Code } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  tagline: string;
  subTagline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  badge: string;
}

export interface AboutData {
  avatar: string;
  bio: string[];
  highlights: { label: string; value: string }[];
  resumeUrl: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  year: string;
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "internship" | "job" | "freelance";
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  cgpa: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
  formSubject: string;
}

export interface FooterData {
  name: string;
  tagline: string;
  navLinks: NavLink[];
  socials: SocialLink[];
  copyright: string;
}

// ── Navbar ────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    { label: 'GitHub', href: 'https://github.com/ARAVIND123465' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aravind5338/' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Aravindhan_5338-1/' },
];

export const navBrand = "Aravindhan.dev";

// ── Hero ──────────────────────────────────────────────────────

export const heroData: HeroData = {
  greeting:     "Hey there, I'm",
  name:         "Aravindhan S",
  tagline:      "Software Developer specializing in Full-Stack & AI-driven applications.",
  subTagline:   "I build scalable systems and intelligent solutions that solve real-world problems.",
  ctaPrimary:   { label: "View My Work",    href: "#projects"      },
  ctaSecondary: { label: "Download Resume", href: "/sample_intern_resume.pdf" },
  badge:        "Open to Opportunities 🚀",
};

// ── About ─────────────────────────────────────────────────────

export const aboutData: AboutData = {
  avatar: "/avatar.jpeg",
  bio: [
    "A developer who enjoys building useful products.",
    "I like working across the stack, keeping things simple, and shipping features that feel polished. I care about readable code, performance, and user experience.",
    "I'm a Master of Computer Applications student at SRM University with a deep passion for crafting high-quality digital products. From frontend interfaces to machine learning pipelines, I love working across the full spectrum of software development.",
    "My journey started with a B.Com (IT) from Hindusthan College of Arts and Science, where I discovered my love for programming. Since then, I've interned at Infosys, Synovers, and Corizo — sharpening my skills in Python, ML, and modern frontend frameworks.",
    "When I'm not coding, I'm exploring new technologies, contributing to open-source, and building tools that solve real problems.",
  ],
  highlights: [
    { label: "Degree",     value: "MCA @ SRM University"      },
    { label: "CGPA",       value: "8.0 / 10"                  },
    { label: "Location",   value: "Chennai, Tamil Nadu"    },
    { label: "Experience", value: "3 Internships"              },
    { label: "Focus",      value: "Web Dev + Machine Learning" },
    { label: "Status",     value: "Available for Work 🟢"     },
  ],
  resumeUrl: "/sample_intern_resume.pdf",
};

// ── Education ─────────────────────────────────────────────────

export const education: Education[] = [
  {
    institution: "SRM University",
    degree:      "MCA — Master of Computer Application",
    period:      "Jul 2025 – May 2027",
    cgpa:        "8.0 / 10",
  },
  {
    institution: "Hindusthan College of Arts and Science",
    degree:      "B.Com — Information Technology",
    period:      "Jun 2022 – May 2025",
    cgpa:        "7.0 / 10",
  },
  {
    institution: "Boys Higher Secondary School",
    degree:      "Higher Secondary (Class XII)",
    period:      "2022",
    cgpa:        "5.7 / 10",
  },
  {
    institution: "Boys Higher Secondary School",
    degree:      "Secondary School (Class X)",
    period:      "2020",
    cgpa:        "5.3 / 10",
  },
];

// ── Certificates ────────────────────────────────────────────────

export const certificates: Certificate[] = [
  {
    title:  "Cybersecurity Virtual Internship",
    issuer: "Deloitte",
    year:   "2024",
    link:   "/deloitte_cyber_security.pdf",
  },
  {
    title:  "Machine Learning Specialization",
    issuer: "Coursera",
    year:   "2024",
    link:   "https://www.coursera.org/account/accomplishments/verify/LR1H57YO9FTY",
  },
  {
    title:  "AWS Academy Graduate - AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    year:   "2025",
    link:   "/aws_academy_certificate.pdf",
  },
];

// ── Experience ────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    company:  "Infosys Pvt Ltd",
    role:     "Skill Development Trainee",
    period:   "Jun 2024 – Aug 2024",
    location: "Krishnagiri, Tamil Nadu (Offline Program)",
    type:     "internship",
    bullets: [
      "Completed a structured offline skill development program conducted through Hicas Academy.",
      "Worked on guided hands-on labs and assignments to strengthen programming and problem-solving skills.",
      "Built confidence with core concepts that support further learning in software development and technology.",
    ],
  },
  {
    company:  "Corizo Pvt Ltd",
    role:     "Frontend Development Intern",
    period:   "Jun 2024 – Jul 2024",
    location: "Redmond, WA (Remote)",
    type:     "internship",
    bullets: [
      "Built responsive UIs using HTML, CSS, JavaScript, React, Angular, Vue.js, and Bootstrap.",
      "Implemented UI/UX design principles, DOM manipulation, and interactive web features.",
      "Developed personal and academic projects showcasing frontend engineering skills.",
    ],
  },
  {
    company:  "Synovers Pvt Ltd",
    role:     "JavaScript Developer Intern",
    period:   "Oct 2023 – Nov 2023",
    location: "Redmond, WA (Remote)",
    type:     "internship",
    bullets: [
      "Worked extensively with JavaScript to build dynamic and interactive web applications.",
      "Studied high-level language features including closures, async/await, and event-driven architecture.",
      "Contributed to frontend module development and code reviews.",
    ],
  },
];

// ── Skills ────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon:     "Code2",
    skills:   ["JavaScript", "Python", "Java", "C++", "C", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    icon:     "Monitor",
    skills:   ["React.js", "Next.js", "Angular", "Vue.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    category: "Backend & ML",
    icon:     "Server",
    skills:   ["Node.js", "Machine Learning", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    category: "CS Fundamentals",
    icon:     "BookOpen",
    skills:   ["Data Structures", "Algorithms", "OOP", "REST APIs"],
  },
  {
    category: "Tools",
    icon:     "Wrench",
    skills:   ["Git", "GitHub", "VS Code", "Figma", "Postman"],
  },
];

// ── Projects ──────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id:              1,
    title:           "TFC – Restaurant Ordering Website",
    description:     "A modern restaurant website for Tender Fried Chicken (TFC) with interactive menu, offers, and online ordering UI.",
    longDescription: "A fully responsive restaurant website built for Tender Fried Chicken (TFC). The site highlights featured dishes, combos, and offers, with a clean card-based menu layout and prominent call-to-action sections like Today’s Pick and Order Now. It focuses on fast navigation, clear pricing, and a delightful food-brand experience tailored for Indian users.",
    tags:            ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl:       "https://github.com/ARAVIND123465/TFC-chickenShop",
    liveUrl:         "https://tfc-chicken-shop.vercel.app/",
    featured:        true,
    year:            "2024",
    icon:            "🛡️",
  },
  {
    id:              2,
    title:           "Developer Portfolio",
    description:     "Personal portfolio website built with Next.js showcasing projects and skills.",
    longDescription: "A modern, minimal portfolio website designed to showcase personal projects, skills, and professional history. Built with HTML, CSS, and JavaScript — then upgraded to Next.js for performance and SEO. Demonstrates creativity, UI/UX sensibility, and problem-solving ability through interactive project cards and smooth scroll animations.",
    tags:            ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl:       "https://github.com/ARAVIND123465/portfolio",
    liveUrl:         "https://aravindhan.dev",
    featured:        true,
    year:            "2024",
    icon:            "🌿",
  },
  {
    id:              3,
    title:           "Weather Forecast Application",
    description:     "A real-time weather app that shows current conditions and 7-day forecasts for any city.",
    longDescription: "A responsive weather application that lets users search for any city and instantly see current temperature, conditions, and a multi-day forecast. Built with a clean card-based UI, it integrates with a public weather API and includes features like location-based lookup, graceful loading states, and error handling for invalid locations or network issues.",
    tags:            ["React.js", "TypeScript", "Weather API"],
    githubUrl:       "https://github.com/ARAVIND123465/weatherappapi",
    liveUrl:         "https://weatherappapi-eight.vercel.app/",
    featured:        false,
    year:            "2024",
    icon:            "⛅",
  },
  {
    id:              4,
    title:           "AI Chatbot Clone",
    description:     "An AI-powered chat interface inspired by modern AI assistants, with conversation history and typing effects.",
    longDescription: "An AI chatbot clone that provides a smooth, app-like chat experience. It supports conversation history, typing indicators, and a clean, responsive UI that mimics popular AI chat tools. The frontend is built with React/Next.js and Tailwind CSS, while the backend connects to a large language model API to generate answers based on user prompts.",
    tags:            ["Next.js", "TypeScript", "Tailwind CSS", "LLM API"],
    githubUrl:       "https://github.com/ARAVIND123465/ai-chatbot-clone",
    liveUrl:         "https://chatbot-clone-phi.vercel.app/",
    featured:        false,
    year:            "2025",
    icon:            "🤖",
  },
  {
    id:              5,
    title:           "AI Smart Agricultural System",
    description:     "An AI-assisted smart agriculture project to monitor crops and recommend actions.",
    longDescription: "An AI-powered smart agriculture system that helps farmers monitor crop health and make data-driven decisions. The project focuses on intelligent insights using computer vision and predictive analytics to highlight issues early and suggest practical interventions. The UI presents clear crop status, recommendations, and actionable next steps for daily farm management.",
    tags:            ["AI", "Smart Agriculture", "Computer Vision", "Predictive Analytics"],
    githubUrl:       "https://github.com/ARAVIND123465/ai-smart-agriculture",
    featured:        false,
    year:            "2025",
    icon:            "🌱",
  },
];

// ── Contact ───────────────────────────────────────────────────

export const contactData: ContactData = {
  email:    "aravindhan2215@gmail.com",
  phone:    "+91 63820 39325",
  location: "Krishnagiri, Tamil Nadu, India",
  socials: [
    { platform: "GitHub",   url: "https://github.com/ARAVIND123465", icon: "Github"  },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/aravind5338/", icon: "Linkedin" },
    { platform: "LeetCode", url: "https://leetcode.com/u/Aravindhan_5338-1/", icon: "Code" },
    { platform: "Email",    url: "mailto:aravindhan2215@gmail.com",          icon: "Mail"    },
  ],
  formSubject: "Let's Work Together",
};

// ── Footer ────────────────────────────────────────────────────

export const footerData: FooterData = {
  name:    "Aravindhan S",
  tagline: "Crafting code with purpose.",
  navLinks: [
    { label: "About",    href: "#about"    },
    { label: "Skills",   href: "#skills"   },
    { label: "Projects", href: "#projects" },
    { label: "Contact",  href: "#contact"  },
  ],
  socials: [
    { platform: "GitHub",   url: "https://github.com/ARAVIND123465", icon: "Github"  },
    { platform: "LinkedIn", url: "https://linkedin.com/in/aravind-s-6382039325", icon: "Linkedin" },
    { platform: "LeetCode", url: "https://leetcode.com/yourusername", icon: "Code" },
    { platform: "Email",    url: "mailto:aravindhan2215@gmail.com",          icon: "Mail"    },
  ],
  copyright: `© ${new Date().getFullYear()} Aravindhan S. All rights reserved.`,
};
