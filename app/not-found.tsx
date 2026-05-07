import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Abyss AI Labs',
};

/**
 * Custom 404 page — matches the site's dark/futuristic aesthetic.
 * Next.js App Router renders this automatically for unmatched routes.
 */
export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--background)', color: 'var(--text-primary)' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, var(--neon-subtle) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative large 404 */}
      <div
        className="absolute select-none pointer-events-none font-display font-black text-[20rem] leading-none opacity-[0.03]"
        style={{ color: 'var(--neon)' }}
        aria-hidden="true"
      >
        404
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg">

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border mb-6"
          style={{
            background: 'var(--neon-subtle)',
            borderColor: 'var(--border-strong)',
            boxShadow: '0 0 30px var(--neon-glow)',
          }}
        >
          {/* Terminal cursor SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--neon)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>

        {/* Error code */}
        <span className="badge mb-4">ERROR_404</span>

        <h1
          className="text-4xl font-heading font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Signal Lost
        </h1>

        <p
          className="text-base font-body mb-8 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          The evaluation node you&apos;re looking for doesn&apos;t exist or has been
          moved. Navigate back to base.
        </p>

        {/* Terminal output */}
        <div
          className="p-4 rounded-xl border mb-8 text-left font-mono text-xs"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ color: 'var(--neon)' }}>$</span> resolve{' '}
          <span style={{ color: 'var(--text-secondary)' }}>
            {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}
          </span>
          <br />
          <span style={{ color: '#f87171' }}>✗ route not found</span>
          <br />
          <span style={{ color: 'var(--neon)' }}>→</span> redirecting to{' '}
          <span style={{ color: 'var(--neon)' }}>home</span>
          <span
            className="inline-block w-1.5 h-3.5 ml-0.5 align-middle"
            style={{
              background: 'var(--neon)',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-semibold text-sm border transition-all hover:scale-105"
            style={{
              background: 'var(--neon)',
              borderColor: 'var(--neon)',
              color: '#020709',
              boxShadow: '0 0 20px var(--neon-glow)',
            }}
          >
            ← Return Home
          </Link>
          <Link
            href="/#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm border transition-all hover:scale-105"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
