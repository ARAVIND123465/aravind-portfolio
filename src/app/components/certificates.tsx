'use client';

import { useRef, useState } from 'react';
import { certificates, type Certificate } from '../../data/data';
import { Award, CheckCircle2 } from 'lucide-react';

function CertificateCard({ cert, idx }: { cert: Certificate; idx: number }) {
  const [showAllBullets, setShowAllBullets] = useState(false);
  const collapsedBulletsCount = 4;
  const [isInteracted, setIsInteracted] = useState(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  const bullets = cert.bullets ?? [];
  const visibleBullets = bullets.slice(0, collapsedBulletsCount);
  const extraBullets = bullets.slice(collapsedBulletsCount);

  const dateText =
    cert.startDate && cert.endDate ? `${cert.startDate} - ${cert.endDate}` : cert.year;

  const expLabel = `EXP ${String(idx + 1).padStart(2, '0')}`;

  return (
    <div
      className={`card group relative flex flex-col bg-stone-900/50 border border-stone-800 rounded-xl p-6 hover:border-rose-700/70 hover:bg-stone-900 transition-all hover:-translate-y-0.5 ${
        isInteracted ? 'card-interact' : ''
      }`}
      onPointerEnter={(e) => {
        // Only treat mouse hover as "interacted"
        if (e.pointerType === 'mouse') setIsInteracted(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setIsInteracted(false);
      }}
      onPointerDown={(e) => {
        // Treat touch/tap/click as "interacted"
        if (e.pointerType !== 'mouse') {
          setIsInteracted(true);
          if (interactionTimeoutRef.current) window.clearTimeout(interactionTimeoutRef.current);
          interactionTimeoutRef.current = window.setTimeout(() => {
            setIsInteracted(false);
          }, 1600);
        }
      }}
      onPointerUp={(e) => {
        if (e.pointerType === 'mouse') return;
      }}
    >
      <style>{`
        @keyframes chipIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes datePulse {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-1px) scale(1.03); }
          100% { transform: translateY(0) scale(1); }
        }
        .card:hover .date-pill {
          animation: datePulse 1.1s ease-in-out;
        }

        /* One-time touch/click "unique" animation */
        .card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(0, 242, 255, 0.20) 50%,
            transparent 70%
          );
          opacity: 0;
          transform: translateX(-45%);
        }

        @keyframes shineSweep {
          0% { opacity: 0; transform: translateX(-55%); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateX(55%); }
        }

        .card.card-interact::after {
          opacity: 1;
          animation: shineSweep 700ms ease-out both;
        }

        .card.card-interact .date-pill {
          animation: datePulse 1.1s ease-in-out;
        }
      `}</style>

      {/* Top row: EXP tag (left) + date pill (right) */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-950/40 border border-stone-800 flex items-center justify-center text-rose-400">
            {cert.badgeIcon ? (
              <span className="text-[18px] leading-none translate-y-[1px]">{cert.badgeIcon}</span>
            ) : (
              <Award size={16} />
            )}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[10px] tracking-widest uppercase text-stone-500">
              {expLabel}
            </span>
          </div>
        </div>

        <span className="date-pill font-mono text-xs text-stone-300 border border-stone-800 bg-stone-950/40 rounded-md px-3 py-1 transition-transform duration-300">
          {dateText}
        </span>
      </div>

      {/* Content */}
      <div className="pr-2">
        <h3
          className="text-white font-semibold text-base mb-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {cert.title}
        </h3>
        <p className="font-mono text-[11px] tracking-widest uppercase text-stone-500">{cert.issuer}</p>

        {cert.description && (
          <p className="text-stone-400 text-sm leading-relaxed mt-3">{cert.description}</p>
        )}

        {visibleBullets.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {visibleBullets.map((b, i) => (
              <span
                key={b}
                className="inline-flex items-center font-mono text-[11px] tracking-wider text-stone-300 border border-stone-800 bg-stone-950/30 rounded-full px-3 py-1"
                style={{ animation: 'chipIn 420ms ease-out both', animationDelay: `${i * 40}ms` }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {cert.afterSkills && (
          <p className="text-stone-400 text-sm leading-relaxed mt-3">{cert.afterSkills}</p>
        )}

        {extraBullets.length > 0 && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showAllBullets ? 'max-h-[360px] opacity-100 mt-3' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-wrap gap-2">
              {extraBullets.map((b, i) => (
                <span
                  key={b}
                  className="inline-flex items-center font-mono text-[11px] tracking-wider text-stone-300 border border-stone-800 bg-stone-950/30 rounded-full px-3 py-1"
                  style={{
                    animation: 'chipIn 420ms ease-out both',
                    animationDelay: `${(visibleBullets.length + i) * 40}ms`,
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {extraBullets.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAllBullets((v) => !v)}
            className="mt-3 inline-flex items-center font-mono text-[11px] tracking-widest uppercase text-rose-400 hover:text-rose-300 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            {showAllBullets ? 'Show less' : 'Show skills'}
          </button>
        )}
      </div>

      {/* Bottom row: Completed (left) + View Certificate (right) */}
      <div className="mt-auto pt-4 border-t border-stone-800/50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span className="font-mono text-[11px] tracking-widest uppercase text-stone-400">
            Completed
          </span>
        </div>

        {cert.link && (
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border border-stone-700/60 bg-stone-950/20 text-rose-400 hover:text-rose-300 hover:border-rose-700/70 transition-colors"
          >
            View Certificate
          </a>
        )}
      </div>
    </div>
  );
}

export default function Certificates() {
  return (
    <section id="experience" className="relative bg-stone-950 text-white py-24 px-6 overflow-hidden">
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
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest uppercase text-rose-500">
              Experience
            </span>
            <div className="flex-1 h-px bg-stone-800" />
          </div>
          <p className="font-mono text-[11px] tracking-widest uppercase text-stone-500">
            Internships & virtual experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {certificates.map((cert, idx) => (
            <CertificateCard key={cert.title + cert.issuer} cert={cert} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

