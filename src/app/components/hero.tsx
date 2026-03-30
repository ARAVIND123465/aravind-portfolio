'use client';

import { heroData } from '../../data/data';
import { Download, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-stone-950 text-white relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Indigo glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-100px', right: '-100px',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-32 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-cyan-800/50 bg-cyan-950/30 rounded-full px-4 py-1.5 mb-10">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
          <span className="font-mono text-xs text-cyan-300 tracking-widest uppercase">
            {heroData.badge}
          </span>
        </div>

        {/* Greeting */}
        <p className="font-mono text-stone-500 text-sm tracking-widest uppercase mb-3">
          {heroData.greeting}
        </p>

        {/* Name */}
        <h1
          className="font-bold text-white leading-none mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(56px, 9vw, 96px)',
          }}
        >
          {heroData.name}
          <span className="text-cyan-500">.</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(18px, 2.5vw, 26px)',
          }}
        >
          {heroData.tagline}
        </p>

        {/* Sub tagline */}
        <p className="text-stone-500 text-sm leading-relaxed max-w-lg mb-12">
          {heroData.subTagline}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mb-20">
          <a
            href={heroData.ctaPrimary.href}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded transition-all hover:shadow-lg hover:shadow-cyan-900/40"
          >
            {heroData.ctaPrimary.label} <ArrowRight size={14} />
          </a>
          <a
            href={heroData.ctaSecondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            {heroData.ctaSecondary.label} <Download size={14} />
          </a>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center gap-3 text-stone-600 mt-12">
          <div className="w-px h-8 bg-gradient-to-b from-cyan-700 to-transparent" />
          <span className="font-mono text-xs tracking-widest uppercase">scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
