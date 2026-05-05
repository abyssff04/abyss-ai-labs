import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Abyss AI Labs',
  description: 'Terms and conditions governing the use of Abyss AI Labs services.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using Abyss AI Labs' platform, services, or any related resources (collectively "Services"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access or use our Services.`,
  },
  {
    title: '2. Description of Services',
    content: `Abyss AI Labs provides human-in-the-loop AI evaluation services, including but not limited to: structured response comparison, quality scoring, annotation, and feedback generation for AI language models. Our evaluation frameworks are designed to assess accuracy, clarity, engagement, and overall response quality.`,
  },
  {
    title: '3. Intellectual Property',
    content: `All evaluation frameworks, methodologies, scoring rubrics, and proprietary tools developed by Abyss AI Labs remain the exclusive intellectual property of Abyss AI Labs. Clients retain ownership of their submitted prompts and AI outputs. Any jointly developed evaluation criteria will be subject to written agreements specifying ownership terms.`,
  },
  {
    title: '4. Confidentiality',
    content: `We treat all submitted data, prompts, and AI-generated content as confidential. Abyss AI Labs will not share, sell, or disclose client information to third parties without explicit written consent, except as required by law. Evaluators are bound by confidentiality agreements before accessing any client data.`,
  },
  {
    title: '5. No Upfront Risk Policy',
    content: `Abyss AI Labs operates under a no-upfront-risk collaboration model. Initial engagements may include a trial evaluation period with no financial commitment required from the client. Full service agreements are only initiated after mutual satisfaction with trial outcomes.`,
  },
  {
    title: '6. Payment Terms',
    content: `For contracted evaluation work, payment terms will be specified in individual service agreements. Standard terms include net-30 payment upon delivery of evaluation reports. All fees are exclusive of applicable taxes.`,
  },
  {
    title: '7. Limitation of Liability',
    content: `Abyss AI Labs provides evaluation services as professional assessments. While we maintain high accuracy standards, our evaluations represent human judgment and are inherently subject to interpretation. We are not liable for downstream AI model performance, business decisions made based on our evaluations, or any indirect, incidental, or consequential damages.`,
  },
  {
    title: '8. Termination',
    content: `Either party may terminate an engagement with 14 days written notice. Upon termination, all confidential data will be returned or securely deleted per the client's instruction within 30 days.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms are governed by applicable laws. Disputes will first be addressed through good-faith negotiation, followed by mediation if necessary.`,
  },
  {
    title: '10. Modifications',
    content: `Abyss AI Labs reserves the right to update these Terms at any time. Material changes will be communicated via email or prominent notice on this platform. Continued use of our Services after changes constitutes acceptance of the updated Terms.`,
  },
  {
    title: '11. Contact',
    content: `For questions regarding these Terms, please contact us at: legal@abyssailabs.com`,
  },
];

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            Last updated: January 2025 &nbsp;·&nbsp; Effective immediately
          </p>
          <div
            className="mt-4 p-4 rounded-lg border text-sm"
            style={{
              background: 'var(--neon-subtle)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-secondary)',
            }}
          >
            Please read these Terms carefully before using our Services. By using
            Abyss AI Labs, you agree to be bound by these terms.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2
                className="text-lg font-heading font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.title}
              </h2>
              <p
                className="text-sm leading-relaxed font-body"
                style={{ color: 'var(--text-secondary)' }}
              >
                {section.content}
              </p>
              <div
                className="mt-4 border-b"
                style={{ borderColor: 'var(--border)' }}
              />
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2025 Abyss AI Labs. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <Link
              href="/disclaimer"
              className="text-xs font-mono hover:opacity-80 transition-opacity"
              style={{ color: 'var(--neon)' }}
            >
              Disclaimer
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
