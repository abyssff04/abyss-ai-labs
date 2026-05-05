'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Evaluations', href: '#evaluations' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us',       href: '#why-us' },
  { label: 'Vision',       href: '#vision' },
  { label: 'Trust',        href: '#trust' },
  { label: 'Contact',      href: '#contact' },
];

/**
 * Navbar — fixed top, glass-morphism on scroll, mobile hamburger menu.
 */
export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  /* Track scroll position to activate glass effect */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Close menu on resize to desktop */
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // Smooth scroll with offset for fixed nav
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(var(--background-rgb, 2, 7, 9), 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Abyss AI Labs - Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'var(--neon-subtle)',
                  borderColor: 'var(--border-strong)',
                  boxShadow: '0 0 12px var(--neon-glow)',
                }}
              >
                <Zap size={16} style={{ color: 'var(--neon)' }} />
              </div>
              <span
                className="font-display text-sm font-bold tracking-widest uppercase hidden sm:block"
                style={{ color: 'var(--text-primary)' }}
              >
                ABYSS<span style={{ color: 'var(--neon)' }}>_</span>AI
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-1.5 rounded-md text-sm font-body transition-colors duration-200 hover:opacity-100 opacity-70"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right: CTA + Theme Toggle + Hamburger */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* CTA button — desktop only */}
              <button
                onClick={() => handleNavClick('#contact')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-medium border transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--neon-subtle)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--neon)',
                  boxShadow: '0 0 12px var(--neon-glow)',
                }}
              >
                Get Started
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border"
                style={{
                  background: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{   opacity: 0, rotate:  45 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{   opacity: 0, rotate: -45 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col pt-16 md:hidden"
            style={{ background: 'var(--background)' }}
          >
            {/* Decorative grid */}
            <div
              className="absolute inset-0 grid-bg opacity-50"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col px-6 pt-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between w-full px-4 py-4 rounded-xl border text-left text-base font-heading font-medium"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {link.label}
                  <span style={{ color: 'var(--neon)' }}>→</span>
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNavClick('#contact')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 w-full py-4 rounded-xl text-base font-mono font-semibold border"
                style={{
                  background: 'var(--neon-subtle)',
                  borderColor: 'var(--border-strong)',
                  color: 'var(--neon)',
                }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
