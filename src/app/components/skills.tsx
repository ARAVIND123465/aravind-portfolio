'use client';

import { skillCategories, experiences } from '../../data/data';
import { Briefcase, Code2, Monitor, Server, BookOpen, Wrench } from 'lucide-react';

const iconMap: Record<string, any> = {
  Code2, Monitor, Server, BookOpen, Wrench,
};

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
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-cyan-500">
            Skills & Technologies
          </span>
          <div className="flex-1 h-px bg-stone-800" />
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
            <div
              key={exp.company + exp.role}
              className="border border-stone-800 rounded-xl p-7 hover:border-cyan-800/50 transition-colors bg-stone-900/30 group"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-5">
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
              <ul className="flex flex-col gap-2.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-400 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
