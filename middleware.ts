import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * middleware.ts
 *
 * Runs on every matched request (edge runtime).
 * Injects security headers to protect against:
 *   - Clickjacking (X-Frame-Options)
 *   - MIME sniffing (X-Content-Type-Options)
 *   - XSS (X-XSS-Protection, CSP)
 *   - Protocol downgrade (HSTS — enable in production with your domain)
 *   - Referrer leaking (Referrer-Policy)
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const headers  = response.headers;

  // ── Prevent clickjacking ─────────────────────────────────────────────────
  headers.set('X-Frame-Options', 'DENY');

  // ── Prevent MIME type sniffing ───────────────────────────────────────────
  headers.set('X-Content-Type-Options', 'nosniff');

  // ── Legacy XSS filter (IE/old Edge) ─────────────────────────────────────
  headers.set('X-XSS-Protection', '1; mode=block');

  // ── Referrer policy — don't leak full URL to third parties ───────────────
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // ── Permissions policy — disable browser features we don't use ───────────
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // ── HSTS — Uncomment in production after confirming HTTPS works ──────────
  // headers.set(
  //   'Strict-Transport-Security',
  //   'max-age=63072000; includeSubDomains; preload'
  // );

  // ── Content Security Policy ───────────────────────────────────────────────
  // NOTE: This is a permissive baseline suitable for development.
  // Tighten script-src and style-src in production by removing 'unsafe-inline'
  // and using nonces (Next.js 14 supports CSP nonces natively).
  const csp = [
    "default-src 'self'",
    // Scripts: allow self + Next.js inline scripts (required for hydration)
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    // Styles: allow self + inline (Tailwind generates inline styles)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts: allow Google Fonts CDN
    "font-src 'self' https://fonts.gstatic.com",
    // Images: allow self + data URIs (for inline SVGs) + Unsplash (configured in next.config.js)
    "img-src 'self' data: blob: https://images.unsplash.com",
    // Connect: allow self + Anthropic API (if using AI features in future)
    "connect-src 'self'",
    // Media: no external media
    "media-src 'self'",
    // Frames: block all iframes
    "frame-src 'none'",
    // Form submissions only to self
    "form-action 'self'",
    // Base tag: restrict to self
    "base-uri 'self'",
    // Object/embed: block all
    "object-src 'none'",
  ].join('; ');

  headers.set('Content-Security-Policy', csp);

  return response;
}

/**
 * Matcher config — apply middleware to all routes EXCEPT:
 * - Next.js internals (_next/static, _next/image)
 * - Public static files (favicon, images, etc.)
 * - API routes (they set their own headers as needed)
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.svg|favicon\\.ico|robots\\.txt|sitemap\\.xml|og-image\\.svg|api/).*)',
  ],
};
