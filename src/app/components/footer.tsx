'use client';

import { Mail, Github, Linkedin } from 'lucide-react';
import { footerData } from '../../data/data';

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Mail,
};

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p
              className="text-white text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {footerData.name}
            </p>
            <p className="font-mono text-xs text-stone-500 mt-0.5">
              {footerData.tagline}
            </p>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center gap-6">
            {footerData.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs tracking-wider uppercase text-stone-500 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex gap-3">
            {footerData.socials.map((s) => {
              const Icon = iconMap[s.icon] ?? Mail;
              return (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform}
                  className="text-stone-500 hover:text-cyan-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/60 text-center">
          <p className="font-mono text-xs text-stone-600">
            {footerData.copyright}
          </p>
          <p className="font-mono text-xs text-stone-700 mt-1">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
