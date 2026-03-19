'use client';

import { certificates } from '../../data/data';
import { Award } from 'lucide-react';

export default function Certificates() {
  return (
    <section id="certificates" className="relative bg-stone-950 text-white py-24 px-6 overflow-hidden">
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
          top: '-80px', left: '-80px',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-rose-500">
            Certificates
          </span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.title + cert.issuer}
              className="bg-stone-900/50 border border-stone-800 rounded-xl p-6 hover:border-rose-700/70 hover:bg-stone-900 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3
                    className="text-white font-semibold text-base mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {cert.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-widest uppercase text-stone-500">
                    {cert.issuer}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-stone-800/60 border border-stone-700 flex items-center justify-center text-rose-400">
                  <Award size={16} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-xs text-stone-500">{cert.year}</span>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] tracking-widest uppercase text-rose-400 hover:text-rose-300"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

