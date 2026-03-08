// data/data.ts
import { Github, Linkedin, Mail } from "lucide-react";

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
  { label: "Home",     href: "#hero"     },
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

export const navBrand = "Aravindhan.dev";

// ── Hero ──────────────────────────────────────────────────────

export const heroData: HeroData = {
  greeting:     "Hey there, I'm",
  name:         "Aravindhan S",
  tagline:      "Full-Stack Developer & ML Enthusiast",
  subTagline:   "Building beautiful web experiences and intelligent systems — from pixels to predictions.",
  ctaPrimary:   { label: "View My Work",    href: "#projects"      },
  ctaSecondary: { label: "Download Resume", href: "/Srm_resume.pdf" },
  badge:        "Open to Opportunities 🚀",
};

// ── About ─────────────────────────────────────────────────────

export const aboutData: AboutData = {
  avatar: "/avatar.jpg",
  bio: [
    "I'm a Master of Computer Applications student at SRM University with a deep passion for crafting high-quality digital products. From frontend interfaces to machine learning pipelines, I love working across the full spectrum of software development.",
    "My journey started with a B.Com (IT) from Hindusthan College of Arts and Science, where I discovered my love for programming. Since then, I've interned at Infosys, Synovers, and Corizo — sharpening my skills in Python, ML, and modern frontend frameworks.",
    "When I'm not coding, I'm exploring new technologies, contributing to open-source, and building tools that solve real problems.",
  ],
  highlights: [
    { label: "Degree",     value: "MCA @ SRM University"      },
    { label: "CGPA",       value: "8.0 / 10"                  },
    { label: "Location",   value: "Krishnagiri, Tamil Nadu"    },
    { label: "Experience", value: "3 Internships"              },
    { label: "Focus",      value: "Web Dev + Machine Learning" },
    { label: "Status",     value: "Available for Work 🟢"     },
  ],
  resumeUrl: "/Srm_resume.pdf",
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

// ── Experience ────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    company:  "Infosys Pvt Ltd",
    role:     "Machine Learning Intern",
    period:   "Jun 2024 – Aug 2024",
    location: "Cupertino, CA (Remote)",
    type:     "internship",
    bullets: [
      "Developed and implemented Machine Learning models using Python.",
      "Worked on training and validating models through Hicas Academy's offline program.",
      "Gained hands-on experience with supervised learning algorithms and data preprocessing.",
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
    title:           "E-Commerce Platform",
    description:     "A full-featured e-commerce web app with product browsing, cart, and checkout.",
    longDescription: "A scalable e-commerce platform enabling customers to browse and purchase products from anywhere at any time. Designed to help businesses reach a global audience, the platform supports millions of concurrent users with a performant React.js frontend and a clean, responsive UI. Features include product listing, search, cart management, and order placement.",
    tags:            ["HTML", "CSS", "JavaScript", "React.js"],
    githubUrl:       "https://github.com/yourusername/ecommerce",
    liveUrl:         "https://yourecommerce.vercel.app",
    featured:        true,
    year:            "2024",
  },
  {
    id:              2,
    title:           "Developer Portfolio",
    description:     "Personal portfolio website built with Next.js showcasing projects and skills.",
    longDescription: "A modern, minimal portfolio website designed to showcase personal projects, skills, and professional history. Built with HTML, CSS, and JavaScript — then upgraded to Next.js for performance and SEO. Demonstrates creativity, UI/UX sensibility, and problem-solving ability through interactive project cards and smooth scroll animations.",
    tags:            ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl:       "https://github.com/yourusername/portfolio",
    liveUrl:         "https://aravindhan.dev",
    featured:        true,
    year:            "2024",
  },
];

// ── Contact ───────────────────────────────────────────────────

export const contactData: ContactData = {
  email:    "as1084@gmail.com",
  phone:    "+91 63820 39325",
  location: "Krishnagiri, Tamil Nadu, India",
  socials: [
    { platform: "GitHub",   url: "https://github.com/yourusername", icon: "Github"  },
    { platform: "LinkedIn", url: "https://linkedin.com/in/aravind", icon: "Linkedin"},
    { platform: "Email",    url: "mailto:as1084@gmail.com",          icon: "Mail"    },
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
    { platform: "GitHub",   url: "https://github.com/yourusername", icon: "Github"  },
    { platform: "LinkedIn", url: "https://linkedin.com/in/aravind", icon: "Linkedin"},
    { platform: "Email",    url: "mailto:as1084@gmail.com",          icon: "Mail"    },
  ],
  copyright: `© ${new Date().getFullYear()} Aravindhan S. All rights reserved.`,
};