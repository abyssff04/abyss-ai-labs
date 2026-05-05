import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer — Abyss AI Labs',
  description: 'Important disclaimers regarding Abyss AI Labs services and evaluations.',
};

const disclaimerSections = [
  {
    icon: '⚠',
    title: 'Evaluation Accuracy',
    content: `The evaluations provided by Abyss AI Labs represent the professional judgment of trained human evaluators. While we employ rigorous evaluation frameworks and multi-reviewer processes, all assessments are inherently subjective to a degree. No evaluation system — human or automated — can guarantee absolute accuracy or eliminate all bias. Results should be used as one input among several in AI development decisions.`,
  },
  {
    icon: '🤖',
    title: 'AI Performance Outcomes',
    content: `Abyss AI Labs does not guarantee specific improvements in AI model performance following evaluation. Our evaluations identify quality dimensions and provide structured feedback, but the implementation of improvements remains the responsibility of the AI developer or organization. Evaluation results reflect current model states and may not predict future performance.`,
  },
  {
    icon: '🔗',
    title: 'Third-Party Technologies',
    content: `Any references to third-party AI systems, blockchain networks, or decentralized technologies are for informational purposes only. Abyss AI Labs is not affiliated with, endorsed by, or responsible for any third-party platforms mentioned. Integration with third-party systems is subject to separate agreements and the terms of those respective platforms.`,
  },
  {
    icon: '📊',
    title: 'Data and Statistics',
    content: `Statistics, benchmarks, and performance metrics presented on this platform are based on internal evaluation data and may not represent industry-wide standards. Comparative analyses between AI models are conducted under controlled conditions that may not reflect real-world deployment scenarios. Historical performance data does not guarantee future results.`,
  },
  {
    icon: '⛓',
    title: 'Blockchain and Decentralized Systems',
    content: `Abyss AI Labs' future vision includes exploration of on-chain evaluation systems. Any mention of blockchain integration, tokenization, or decentralized evaluation represents forward-looking statements and potential future development, not current capabilities. Such systems are experimental and subject to regulatory uncertainties.`,
  },
  {
    icon: '💼',
    title: 'Professional Advice',
    content: `Content on this platform, including evaluation frameworks, scoring rubrics, and industry commentary, does not constitute legal, financial, or technical advice. Organizations should consult qualified professionals before making significant decisions based on AI evaluation data.`,
  },
  {
    icon: '🔒',
    title: 'Data Security',
    content: `While Abyss AI Labs employs industry-standard security practices to protect submitted data, no digital system is immune to all threats. We cannot guarantee absolute security of data transmitted over the internet. Users should exercise appropriate caution when submitting sensitive AI outputs.`,
  },
  {
    icon: '🌐',
    title: 'Availability',
    content: `Abyss AI Labs does not warrant uninterrupted or error-free operation of its platform. We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time. We are not liable for any interruption or discontinuation of services.`,
  },
];

export default function DisclaimerPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--background)', color: 'var(--text-primary)' }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 border-b px-4 py-4 flex items-center justify-between"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-mono transition-colors hover:opacity-80"
          style={{ color: 'var(--neon)' }}
          aria-label="Back to home"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <span
          className="font-display text-sm font-bold tracking-widest uppercase"
          style={{ color: 'var(--neon)' }}
        >
          ABYSS AI LABS
        </span>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="badge mb-4 inline-flex">LEGAL DOCUMENT</span>
          <h1
            className="text-4xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Disclaimer
          </h1>
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            Last updated: January 2025 &nbsp;·&nbsp; Please read carefully
          </p>

          {/* Warning box */}
          <div
            className="mt-4 p-4 rounded-lg border flex gap-3 items-start"
            style={{
              background: 'rgba(234, 179, 8, 0.06)',
              borderColor: 'rgba(234, 179, 8, 0.2)',
            }}
          >
            <AlertTriangle
              size={18}
              className="mt-0.5 flex-shrink-0"
              style={{ color: '#eab308' }}
            />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              This disclaimer contains important limitations and disclosures about
              Abyss AI Labs services. Using our platform constitutes acknowledgment
              of these terms.
            </p>
          </div>
        </div>

        {/* Disclaimer Sections */}
        <div className="space-y-8">
          {disclaimerSections.map((section) => (
            <section
              key={section.title}
              className="p-6 rounded-xl border"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl" aria-hidden="true">
                  {section.icon}
                </span>
                <h2
                  className="text-base font-heading font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {section.title}
                </h2>
              </div>
              <p
                className="text-sm leading-relaxed font-body"
                style={{ color: 'var(--text-secondary)' }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* General Notice */}
        <div
          className="mt-10 p-6 rounded-xl border"
          style={{
            background: 'var(--neon-subtle)',
            borderColor: 'var(--border-strong)',
          }}
        >
          <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--neon)' }}>Notice:</span> This disclaimer
            was last reviewed and updated in January 2025. Abyss AI Labs reserves
            the right to update this disclaimer at any time without prior notice.
            Continued use of our services following updates constitutes acceptance
            of the revised disclaimer.
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2025 Abyss AI Labs. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link
              href="/terms"
              className="text-xs font-mono hover:opacity-80 transition-opacity"
              style={{ color: 'var(--neon)' }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/#contact"
              className="text-xs font-mono hover:opacity-80 transition-opacity"
              style={{ color: 'var(--neon)' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
