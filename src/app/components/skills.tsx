'use client';

import { useRef, useState } from 'react';
import { skillCategories, experiences, type Experience } from '../../data/data';
import { Briefcase, Code2, Monitor, Server, BookOpen, Wrench } from 'lucide-react';

const iconMap: Record<string, any> = {
  Code2, Monitor, Server, BookOpen, Wrench,
};

function ExperienceCard({ exp }: { exp: Experience }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const rippleTimerRef = useRef<number | null>(null);

  const triggerRipple = (clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setRipple({ x, y, key: Date.now() });

    if (rippleTimerRef.current) window.clearTimeout(rippleTimerRef.current);
    rippleTimerRef.current = window.setTimeout(() => {
      setRipple(null);
    }, 900);
  };

  return (
    <div
      ref={cardRef}
      className="relative border border-stone-800 rounded-xl p-7 bg-stone-900/30 overflow-hidden group cursor-pointer transition-colors hover:border-cyan-800/50 hover:bg-stone-900"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setIsHovered(false);
      }}
      onPointerDown={(e) => {
        // Touch/click ripple
        if (e.pointerType !== 'mouse') {
          triggerRipple(e.clientX, e.clientY);
        }
      }}
      onClick={(e) => {
        // Also support mouse click as a tap-like effect
        if (e.detail === 1) triggerRipple(e.clientX, e.clientY);
      }}
      role="button"
      tabIndex={0}
      aria-label={`${exp.role} at ${exp.company}`}
    >
      <style>{`
        @keyframes rippleExpand {
          from { opacity: 0.7; transform: scale(0.4); }
          to { opacity: 0; transform: scale(1.8); }
        }
        @keyframes sweepGlow {
          0% { transform: translateX(-60%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateX(60%); opacity: 0; }
        }
      `}</style>

      {/* Gradient sweep on hover/interact */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 250ms ease',
        }}
      >
        <div
          className="absolute -top-20 left-1/2 w-[260px] h-[160px] bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent blur-2xl"
          style={{
            transform: 'translateX(-50%)',
            animation: isHovered ? 'sweepGlow 900ms ease-out both' : undefined,
          }}
        />
      </div>

      {/* Ripple */}
      {ripple && (
        <span
          key={ripple.key}
          className="pointer-events-none absolute rounded-full bg-cyan-400/20"
          style={{
            width: 18,
            height: 18,
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            animation: 'rippleExpand 850ms ease-out both',
          }}
        />
      )}

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-5 relative z-10">
        <div>
          <h3
            className="text-white font-bold text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {exp.role}
          </h3>
          <p className="text-cyan-500 font-mono text-xs tracking-widest mt-1">
            {exp.company}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-xs text-stone-400">{exp.period}</p>
          <p className="font-mono text-xs text-stone-600 mt-1">{exp.location}</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2.5">
          {exp.bullets.map((b, i) => (
            <span
              // bullets are unique enough; use i for safety
              key={`${i}-${b}`}
              className="inline-flex items-start font-mono text-[11px] tracking-wide text-stone-300 border border-stone-800 bg-stone-950/20 rounded-full px-3 py-1"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-stone-950 text-white py-24 px-6 overflow-hidden">
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
          top: '-80px', right: '-80px',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label & Main Title */}
        <div className="flex flex-col gap-6 mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-500 font-bold">
            Skills
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
               Tools I use to build<span className="text-cyan-500">.</span>
             </h2>
             <p className="text-stone-500 text-sm font-medium max-w-md md:text-right">
               A blend of languages, frameworks, and core CS fundamentals.
             </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {skillCategories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <div
                key={cat.category}
                className="bg-stone-900/50 border border-stone-800 rounded-xl p-5 hover:border-cyan-800/60 hover:bg-stone-900 transition-all group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon size={13} className="text-cyan-500" />
                  <h3 className="font-mono text-[10px] tracking-widest uppercase text-cyan-500">
                    {cat.category}
                  </h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="text-stone-400 text-xs leading-relaxed group-hover:text-stone-300 transition-colors">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Internship Experience */}
        <div className="flex items-center gap-3 mb-10">
          <Briefcase size={13} className="text-cyan-500" />
          <span className="font-mono text-xs tracking-widest uppercase text-cyan-500">
            Internship Experience
          </span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        <div className="flex flex-col gap-5">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.company + exp.role} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
