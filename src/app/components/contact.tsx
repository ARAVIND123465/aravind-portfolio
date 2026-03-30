'use client';

import { useState } from 'react';
import { contactData } from '../../data/data';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2 } from 'lucide-react';

const iconMap: Record<string, any> = {
  Github, Linkedin, Mail,
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="relative bg-stone-950 text-white py-24 px-6 overflow-hidden">
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
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(0, 242, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-cyan-500">
            Get In Touch
          </span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            <h2
              className="font-bold text-white mb-5 leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
              }}
            >
              Let&apos;s build something{' '}
              <span className="text-cyan-500">remarkable.</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-10 max-w-sm">
              I&apos;m actively looking for internship and full-time opportunities.
              Whether you have a project idea, a job offer, or just want to say hi —
              my inbox is always open.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-3 text-stone-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-900/40 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-cyan-500" />
                </div>
                <a href={`mailto:${contactData.email}`} className="hover:text-cyan-400 transition-colors">
                  {contactData.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-900/40 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-cyan-500" />
                </div>
                <span>{contactData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-stone-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-900/40 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-cyan-500" />
                </div>
                <span>{contactData.location}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {contactData.socials.map((s) => {
                const Icon = iconMap[s.icon] ?? Mail;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.platform}
                    className="w-10 h-10 border border-stone-700 rounded-lg flex items-center justify-center text-stone-400 hover:border-cyan-700 hover:text-cyan-400 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
        </div>

        {/* Right — Form */}
        <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-cyan-950/40 border border-cyan-800/60 rounded-full flex items-center justify-center mb-5">
                <Mail size={24} className="text-cyan-400" />
              </div>
              <h3
                className="text-white text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Message Sent!
              </h3>
              <p className="text-stone-400 text-sm mb-6">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-mono text-xs tracking-widest uppercase text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-stone-800/50 border border-stone-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-cyan-600 transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-stone-800/50 border border-stone-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-cyan-600 transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Let's work together..."
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-stone-800/50 border border-stone-700 rounded-lg px-4 py-3 text-white text-sm placeholder:text-stone-600 focus:outline-none focus:border-cyan-600 transition-colors resize-none disabled:opacity-50"
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className="text-cyan-400 text-xs font-mono bg-cyan-950/30 border border-cyan-900/40 rounded-lg px-4 py-3">
                  ⚠ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-mono text-xs tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-900/30"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={13} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </section >
  );
}