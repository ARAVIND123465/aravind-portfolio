'use client';

import { useState, useEffect } from 'react';
import { navLinks, navBrand } from '../../data/data';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow/border when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Brand */}
          <a
            href="#home"
            className="text-rose-500 font-bold text-base tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {navBrand}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-widest uppercase text-stone-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Hire Me Button + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2 border border-rose-600 text-rose-500 hover:bg-rose-600 hover:text-white font-mono text-xs tracking-widest uppercase rounded transition-all"
            >
              Hire Me
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-950/98 border-t border-stone-800">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm tracking-widest uppercase text-stone-400 hover:text-rose-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 px-6 py-2.5 border border-rose-600 text-rose-500 hover:bg-rose-600 hover:text-white font-mono text-xs tracking-widest uppercase rounded transition-all"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
