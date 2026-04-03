'use client';

import { useState } from 'react';

import { projects, contactData, type Project } from '../../data/data';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

function ProjectCard({ project }: { project: Project }) {
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.githubUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback for browsers without clipboard permission
      window.prompt('Copy GitHub URL:', project.githubUrl);
    }
  };

  return (
    <div
      className="relative bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden hover:border-cyan-800/60 transition-all group"
    >
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-cyan-600/60 via-cyan-500/30 to-transparent" />

      <div className="p-7 flex flex-col h-full">
        {/* Header: Icon & Tags */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-stone-800/50 border border-stone-700/50 flex flex-shrink-0 items-center justify-center text-2xl mb-4 shadow-inner shadow-stone-800 pointer-events-none select-none">
            {project.icon}
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest uppercase bg-stone-800 text-stone-400 border border-stone-700 px-2.5 py-1 rounded-full group-hover:border-cyan-900/60 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-white text-2xl font-bold mb-3 mt-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-stone-400 text-sm leading-relaxed flex-1 mb-7">{project.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-stone-800">
          <span className="font-mono text-xs text-stone-600">{project.year}</span>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsCodeOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-stone-700/60 bg-stone-950/20 text-stone-500 hover:text-rose-400 hover:border-rose-700/70 transition-colors"
            >
              <Github size={16} />
              Code
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-stone-700/60 bg-stone-950/20 text-stone-500 hover:text-cyan-400 hover:border-cyan-700/70 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Code Viewer Modal */}
      {isCodeOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsCodeOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg rounded-2xl border border-stone-700/70 bg-stone-950/95 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-white font-semibold text-lg">Code Viewer</h4>
                <p className="text-stone-400 text-sm mt-1 break-all">{project.githubUrl}</p>
                <p className="text-stone-500 text-xs mt-3 font-mono tracking-widest uppercase">
                  Viewer type: GitHub
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCodeOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-stone-700/60 bg-stone-900/40 text-stone-300 hover:text-white hover:border-cyan-700/70 transition-colors"
              >
                {copied ? 'Copied' : 'Copy Link'}
              </button>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-stone-700/60 bg-stone-950/20 text-rose-400 hover:text-rose-300 hover:border-rose-700/70 transition-colors"
              >
                <Github size={16} />
                Open GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const githubUrl = contactData.socials.find((s) => s.platform === 'GitHub')?.url ?? '#';

  return (
    <section id="projects" className="relative bg-stone-950 text-white py-24 px-6 overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-80px', left: '-80px',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-cyan-500">
            Projects
          </span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        {/* Section Title */}
        <div className="mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Things I&apos;ve{' '}
            <span className="text-cyan-500">Built.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-14">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-stone-500 hover:text-cyan-500 transition-colors"
          >
            View All on GitHub <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
