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
      {/* Red glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-100px', right: '-100px',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(225,29,72,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-32 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-rose-800/50 bg-rose-950/30 rounded-full px-4 py-1.5 mb-10">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
          <span className="font-mono text-xs text-rose-300 tracking-widest uppercase">
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
          <span className="text-rose-500">.</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-stone-400 font-light mb-4"
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
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded transition-all hover:shadow-lg hover:shadow-rose-900/40"
          >
            {heroData.ctaPrimary.label} <ArrowRight size={14} />
          </a>
          <a
            href={heroData.ctaSecondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-stone-700 hover:border-rose-700 text-stone-400 hover:text-rose-400 font-mono text-xs tracking-widest uppercase px-8 py-4 rounded transition-all"
          >
            {heroData.ctaSecondary.label} <Download size={14} />
          </a>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center gap-3 text-stone-600">
          <div className="w-px h-8 bg-gradient-to-b from-rose-700 to-transparent" />
          <span className="font-mono text-xs tracking-widest uppercase">scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
