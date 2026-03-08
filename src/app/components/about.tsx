'use client';

import { aboutData, education } from '../../data/data';
import { GraduationCap, Download } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative bg-stone-950 text-white py-24 px-6 overflow-hidden">
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
          bottom: '-100px', left: '-100px',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(225,29,72,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-rose-500">
            About Me
          </span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        <div className="grid md:grid-cols-5 gap-14 items-start">
          {/* Left — Avatar + Highlights */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Avatar */}
            <div className="relative w-52 h-52 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-2xl bg-rose-900/40 rotate-3 border border-rose-800/40" />
              <div className="absolute inset-0 rounded-2xl bg-stone-800 -rotate-1 flex items-center justify-center border border-stone-700">
                <span
                  className="text-5xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  AS
                </span>
              </div>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 gap-3">
              {aboutData.highlights.map((h) => (
                <div
                  key={h.label}
                  className="bg-stone-900/60 border border-stone-800 rounded-xl p-3 hover:border-rose-800/60 transition-colors"
                >
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-1">
                    {h.label}
                  </p>
                  <p className="text-white text-xs font-medium leading-snug">
                    {h.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bio + Education + Button */}
          <div className="md:col-span-3 flex flex-col gap-8">
            {/* Bio */}
            <div className="flex flex-col gap-4">
              {aboutData.bio.map((para, i) => (
                <p key={i} className="text-stone-400 leading-relaxed text-sm">
                  {para}
                </p>
              ))}
            </div>

            {/* Education */}
            <div>
              <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-stone-500 mb-5">
                <GraduationCap size={13} className="text-rose-500" /> Education
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <div
                    key={edu.institution + edu.degree}
                    className="flex justify-between items-start border-l-2 border-stone-700 pl-4 py-1 hover:border-rose-600 transition-colors"
                  >
                    <div>
                      <p className="text-white text-sm font-semibold">{edu.institution}</p>
                      <p className="text-stone-500 text-xs mt-0.5">{edu.degree}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="font-mono text-xs text-rose-400 bg-rose-950/50 border border-rose-900/50 px-2 py-0.5 rounded-full">
                        {edu.cgpa}
                      </span>
                      <p className="font-mono text-[10px] text-stone-600 mt-1">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Resume */}
            <a
              href={aboutData.resumeUrl}
              download="Aravindhan_Resume.pdf"
              className="self-start inline-flex items-center gap-2 px-6 py-3 bg-stone-900 border border-stone-700 text-white hover:bg-rose-600 hover:border-rose-600 font-mono text-xs tracking-widest uppercase rounded transition-all"
            >
              Download Resume <Download size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
