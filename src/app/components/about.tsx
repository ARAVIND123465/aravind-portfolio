'use client';

import { aboutData, education } from '../../data/data';
import { GraduationCap, Download } from 'lucide-react';
import Image from 'next/image';

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
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column — Bio */}
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-500 font-bold mb-2 block">
              About
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              A developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">who enjoys</span> building useful products.
            </h2>
            <div className="flex flex-col gap-6">
              {aboutData.bio.slice(1).map((para, i) => (
                <p key={i} className="text-stone-400 leading-relaxed text-base font-medium">
                  {para}
                </p>
              ))}
            </div>

            {/* Download Resume Link (matches screenshot style) */}
            <a
              href={aboutData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Aravindhan_S_Resume.pdf"
              className="mt-8 self-start inline-flex items-center gap-2 group text-white font-mono text-[11px] tracking-widest uppercase transition-all"
            >
              <span className="relative pb-1 border-b border-stone-800 group-hover:border-cyan-500 transition-colors">
                Download Resume
              </span>
              <Download size={12} className="text-cyan-500 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column — Education Timeline */}
          <div className="bg-stone-900/30 border border-stone-800/60 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-mono text-xs tracking-widest uppercase text-white font-semibold">
                Education
              </h3>
              <span className="font-mono text-[10px] tracking-widest uppercase text-stone-600">
                Timeline
              </span>
            </div>

            <div className="relative flex flex-col gap-10">
              {/* Timeline Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-stone-800" />

              {education.map((edu, idx) => (
                <div key={edu.institution + idx} className="relative pl-8 group">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] bg-stone-950 border-2 border-stone-800 rounded-full flex items-center justify-center transition-all group-hover:border-cyan-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-white font-bold text-sm tracking-tight group-hover:text-cyan-400 transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="font-mono text-[10px] text-stone-500 shrink-0 mt-1">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-stone-400 text-xs font-medium">
                      {edu.institution} • {edu.cgpa}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
