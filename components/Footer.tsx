'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  Twitter,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Send,
} from 'lucide-react';

/* ─── Contact Form State ─────────────────────────────────────────────────── */
type FormState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Contact form — uses Next.js API route /api/contact for form submission.
 * Replace the API route with your preferred email service (Resend, SendGrid, etc.).
 */
function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData,  setFormData]  = useState({
    name: '', email: '', org: '', message: '', useCase: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  const inputStyle = {
    background: 'var(--surface-2)',
    borderColor: 'var(--border)',
    color: 'var(--text-primary)',
  };

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl border text-center"
        style={{
          background: 'var(--neon-subtle)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: 'var(--neon)', color: '#020709' }}
        >
          <Send size={20} />
        </div>
        <h3
          className="text-lg font-heading font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Message Received
        </h3>
        <p className="text-sm font-body" style={{ color: 'var(--text-secondary)' }}>
          We&apos;ll review your request and get back to you within 24 hours.
          Check your inbox for a confirmation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-mono mb-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border text-sm font-body focus:outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--neon)'; }}
            onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-mono mb-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border text-sm font-body focus:outline-none transition-colors"
            style={inputStyle}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--neon)'; }}
            onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-org"
          className="block text-xs font-mono mb-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          Organization
        </label>
        <input
          id="contact-org"
          type="text"
          value={formData.org}
          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border text-sm font-body focus:outline-none transition-colors"
          style={inputStyle}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--neon)'; }}
          onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
          placeholder="Company or team name"
        />
      </div>

      <div>
        <label
          htmlFor="contact-usecase"
          className="block text-xs font-mono mb-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          Evaluation Use Case
        </label>
        <select
          id="contact-usecase"
          value={formData.useCase}
          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border text-sm font-body focus:outline-none transition-colors"
          style={inputStyle}
        >
          <option value="">Select a use case...</option>
          <option value="rlhf">RLHF / Preference Data</option>
          <option value="comparison">Response Comparison</option>
          <option value="annotation">Annotation & Labeling</option>
          <option value="safety">Safety Evaluation</option>
          <option value="benchmark">Benchmark Construction</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-mono mb-1.5"
          style={{ color: 'var(--text-muted)' }}
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border text-sm font-body focus:outline-none transition-colors resize-none"
          style={inputStyle}
          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--neon)'; }}
          onBlur={(e)  => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'; }}
          placeholder="Tell us about your evaluation needs, volume estimates, and timeline..."
        />
      </div>

      {formState === 'error' && (
        <p className="text-xs font-mono text-red-400">
          Something went wrong. Please email us directly at hello@abyssailabs.com
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="group w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono font-semibold text-sm border transition-all duration-200 hover:scale-[1.02] disabled:opacity-60"
        style={{
          background: 'var(--neon)',
          borderColor: 'var(--neon)',
          color: '#020709',
          boxShadow: '0 0 20px var(--neon-glow)',
        }}
      >
        {formState === 'loading' ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
const footerLinks = {
  Platform: [
    { label: 'Sample Evaluations', href: '#evaluations' },
    { label: 'How It Works',       href: '#how-it-works' },
    { label: 'Why Choose Us',      href: '#why-us' },
    { label: 'Future Vision',      href: '#vision' },
  ],
  Company: [
    { label: 'About',         href: '#trust' },
    { label: 'Terms & Conditions', href: '/terms', external: false },
    { label: 'Disclaimer',    href: '/disclaimer', external: false },
  ],
};

const socials = [
  { icon: Twitter,  label: 'Twitter / X',  href: 'https://twitter.com/abyssailabs'  },
  { icon: Github,   label: 'GitHub',        href: 'https://github.com/abyssailabs'   },
  { icon: Linkedin, label: 'LinkedIn',      href: 'https://linkedin.com/company/abyssailabs' },
  { icon: Mail,     label: 'Email us',      href: 'mailto:hello@abyssailabs.com'     },
];

export default function Footer() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-12"
      style={{ background: 'var(--background-2)', borderTop: '1px solid var(--border)' }}
      aria-label="Footer"
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--neon), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-lg px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 mb-20">

          {/* Left: Contact CTA + Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="badge mb-4">Get In Touch</span>
            <h2
              className="text-3xl md:text-4xl font-heading font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Start Your{' '}
              <span className="gradient-text">Pilot Evaluation</span>
            </h2>
            <p
              className="text-base font-body mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              No upfront commitment. Send us your evaluation request, and
              we&apos;ll run a free pilot batch so you can see the quality
              of our work before deciding.
            </p>
            <ContactForm />
          </motion.div>

          {/* Right: Info + links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between gap-10"
          >
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{
                    background: 'var(--neon-subtle)',
                    borderColor: 'var(--border-strong)',
                    boxShadow: '0 0 16px var(--neon-glow)',
                  }}
                >
                  <Zap size={18} style={{ color: 'var(--neon)' }} />
                </div>
                <span
                  className="font-display text-base font-bold tracking-widest uppercase"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ABYSS AI LABS
                </span>
              </div>
              <p
                className="text-sm font-body leading-relaxed max-w-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                Human Intelligence for Better AI Systems. Precision evaluation
                services for AI labs, research teams, and product companies.
              </p>

              {/* Socials */}
              <div className="flex gap-3 mt-5">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 hover:scale-110"
                      style={{
                        background: 'var(--surface)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-secondary)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                          'var(--border-strong)';
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          'var(--neon)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                          'var(--border)';
                        (e.currentTarget as HTMLAnchorElement).style.color =
                          'var(--text-secondary)';
                      }}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-widest mb-4"
                    style={{ color: 'var(--neon)' }}
                  >
                    {category}
                  </p>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        {link.href.startsWith('#') ? (
                          <button
                            onClick={() => {
                              const id = link.href.replace('#', '');
                              const el = document.getElementById(id);
                              if (el)
                                window.scrollTo({
                                  top: el.offsetTop - 80,
                                  behavior: 'smooth',
                                });
                            }}
                            className="text-sm font-body hover:opacity-100 opacity-60 transition-opacity text-left"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm font-body hover:opacity-100 opacity-60 transition-opacity"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div
              className="p-4 rounded-xl border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <p className="text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>
                Direct Contact
              </p>
              <a
                href="mailto:hello@abyssailabs.com"
                className="text-sm font-mono font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--neon)' }}
              >
                hello@abyssailabs.com
              </a>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                Response time: &lt;24 hours
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2025 Abyss AI Labs. All rights reserved. Built for the AI era.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            <Link
              href="/terms"
              className="hover:opacity-100 opacity-60 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/disclaimer"
              className="hover:opacity-100 opacity-60 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            >
              Disclaimer
            </Link>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:hello@abyssailabs.com"
              className="hover:opacity-100 opacity-60 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
