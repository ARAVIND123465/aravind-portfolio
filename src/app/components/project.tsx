'use client';

import { projects, contactData } from '../../data/data';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

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
          background: 'radial-gradient(circle, rgba(225,29,72,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-rose-500">
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
            <span className="text-rose-500">Built.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative bg-stone-900/50 border border-stone-800 rounded-2xl overflow-hidden hover:border-rose-800/60 transition-all group"
            >
              {/* Top accent line */}
              <div className="h-px bg-gradient-to-r from-rose-600/60 via-rose-500/30 to-transparent" />

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
                        className="font-mono text-[10px] tracking-widest uppercase bg-stone-800 text-stone-400 border border-stone-700 px-2.5 py-1 rounded-full group-hover:border-rose-900/60 transition-colors"
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
                <p className="text-stone-400 text-sm leading-relaxed flex-1 mb-7">
                  {project.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-stone-800">
                  <span className="font-mono text-xs text-stone-600">{project.year}</span>
                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-stone-500 hover:text-rose-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-500 hover:text-rose-400 transition-colors"
                        aria-label="Live site"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-14">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-stone-500 hover:text-rose-500 transition-colors"
          >
            View All on GitHub <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
