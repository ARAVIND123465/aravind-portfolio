'use client';

import { heroData, aboutData } from '../../data/data';
import { Download, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-stone-950 text-white relative overflow-hidden pt-20"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Animated Deep Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Cyber Beams */}
      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent rotate-12 pointer-events-none" />
      <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent rotate-12 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 w-full grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column — Content */}
        <div className="order-2 md:order-1 flex flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-cyan-800/50 bg-cyan-950/30 rounded-full px-4 py-1.5 mb-10 w-fit">
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
              fontSize: 'clamp(48px, 6vw, 72px)',
            }}
          >
            {heroData.name}
            <span className="text-cyan-500">.</span>
          </h1>

          {/* Tagline with unique colors per phrase */}
          <p
            className="font-bold mb-4 flex flex-wrap gap-x-2 items-baseline leading-[1.1]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(20px, 2.5vw, 28px)',
            }}
          >
            <span className="text-white">Software Developer</span>
            <span className="text-stone-500 text-[16px] font-mono tracking-tight lowercase">specializing in</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Full-Stack</span>
            <span className="text-stone-600 text-[18px]">&</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">AI-driven applications.</span>
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
              download="Aravindhan_S_Resume.pdf"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-mono text-xs tracking-widest uppercase px-8 py-4 rounded transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              {heroData.ctaSecondary.label} <Download size={14} />
            </a>
          </div>

          {/* Scroll hint */}
          <div className="hidden md:flex items-center gap-3 text-stone-600">
            <div className="w-px h-8 bg-gradient-to-b from-cyan-700 to-transparent" />
            <span className="font-mono text-xs tracking-widest uppercase">scroll to explore</span>
          </div>
        </div>

        {/* Right Column — Profile Card */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative group p-1 transition-all duration-500">
            {/* Multi-layered Cyber Glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -inset-12 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 rounded-[5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            {/* Main Card — Increased to 540px for Maximum Impact */}
            <div className="relative w-full max-w-[540px] bg-stone-900/60 backdrop-blur-3xl border border-stone-800/80 rounded-[3rem] overflow-hidden p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transform transition-transform duration-700 group-hover:-translate-y-4">
              
              {/* Photo Area — 3:4 Aspect Ratio */}
              <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden mb-8 bg-stone-800 ring-1 ring-white/10 group-hover:ring-cyan-500/40 transition-all duration-500">
                <Image
                  src={aboutData.avatar}
                  alt={heroData.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-1 px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-cyan-500 font-bold">
                    Portfolio
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="font-mono text-[9px] text-cyan-300 uppercase tracking-widest">Live_Sync</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {heroData.name}
                </h2>
                
                <p className="text-stone-400 text-lg font-medium mb-6">
                  Software Developer
                </p>

                {/* Info Pills */}
                <div className="flex flex-col gap-2 pt-6 border-t border-stone-800/60">
                   <div className="flex items-center gap-3 text-stone-500">
                     <MapPin size={14} className="text-cyan-600" />
                     <span className="text-[12px] font-mono tracking-wide uppercase">Krishnagiri, Tamil Nadu</span>
                   </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-[-25%] right-[-25%] w-full h-full bg-cyan-500 rotate-45 transform" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
