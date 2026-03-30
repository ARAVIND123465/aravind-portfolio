'use client';

import { useState, useEffect } from 'react';
import { navLinks, navBrand } from '../../data/data';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for background opacity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sections = navLinks.map(link => link.href.replace('#', '')).filter(id => id !== '');
    
    const options = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-950/90 backdrop-blur-md border-b border-cyan-500/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-link-entrance {
          animation: fade-in-down 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">

          {/* Brand */}
          <a
            href="#home"
            className="text-cyan-500 font-bold text-lg tracking-tight group flex items-center gap-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#00f2ff] opacity-0 group-hover:opacity-100 transition-opacity" />
            {navBrand}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link, idx) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative group font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 nav-link-entrance ${
                    isActive ? 'text-cyan-400' : 'text-stone-400 hover:text-white'
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {link.label}
                  {/* Sliding Underline */}
                  <span 
                    className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-cyan-500 transition-all duration-300 ${
                      isActive ? 'w-full shadow-[0_0_8px_#00f2ff]' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* Hire Me Button + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-6 py-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-600 hover:text-white hover:shadow-[0_0_15px_#00f2ff55] font-mono text-[10px] tracking-widest uppercase rounded transition-all duration-300"
            >
              Hire Me
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-cyan-500 p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-950/98 border-t border-cyan-900/30 backdrop-blur-xl">
          <nav className="flex flex-col items-center gap-6 py-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                  activeSection === link.href.replace('#', '') ? 'text-cyan-400' : 'text-stone-400'
                }`}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-8 py-3 border border-cyan-500/50 text-cyan-400 font-mono text-[10px] tracking-widest uppercase rounded"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
