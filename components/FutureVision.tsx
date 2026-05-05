'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link as LinkIcon, Globe, Cpu, Lock, Coins, Network } from 'lucide-react';

const visionItems = [
  {
    icon: LinkIcon,
    title: 'On-Chain Evaluation Records',
    description:
      'Future iterations of our platform will publish evaluation records to immutable ledgers — creating verifiable, tamper-proof audit trails for AI assessment history.',
    status: 'In Research',
    statusColor: '#f59e0b',
  },
  {
    icon: Network,
    title: 'Decentralized Evaluator Network',
    description:
      'A distributed network of credentialed human evaluators coordinated through smart contracts — enabling global-scale evaluation without centralized bottlenecks.',
    status: 'Roadmap 2026',
    statusColor: '#3b82f6',
  },
  {
    icon: Coins,
    title: 'Tokenized Reputation System',
    description:
      'Evaluators earn reputation tokens based on calibration accuracy and consistency. High-reputation evaluators unlock higher-value tasks in a merit-based system.',
    status: 'Concept Phase',
    statusColor: '#8b5cf6',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Evaluation Proofs',
    description:
      'Prove that an AI response was evaluated without revealing the evaluator identity or proprietary rubrics — enabling trustless evaluation in competitive environments.',
    status: 'Research',
    statusColor: '#ec4899',
  },
  {
    icon: Globe,
    title: 'Cross-Platform Evaluation Standards',
    description:
      'Working toward open evaluation standards that can be adopted across AI labs — enabling interoperable benchmarks and comparative analysis at industry scale.',
    status: 'Active Development',
    statusColor: 'var(--neon)',
  },
  {
    icon: Cpu,
    title: 'Hybrid Human-AI Pipelines',
    description:
      'AI-assisted pre-screening combined with human expert review for complex edge cases — dramatically reducing cost while preserving the quality of human judgment.',
    status: 'Beta Testing',
    statusColor: 'var(--neon)',
  },
];

export default function FutureVision() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="vision"
      className="section-pad relative overflow-hidden"
      aria-labelledby="vision-heading"
    >
      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative circuit lines */}
      <svg
        className="absolute top-0 right-0 opacity-[0.04] pointer-events-none"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" style={{ color: 'var(--neon)' }} />
        <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" style={{ color: 'var(--neon)' }} />
        <circle cx="300" cy="300" r="110" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--neon)' }} />
        <line x1="50"  y1="300" x2="550" y2="300" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--neon)' }} />
        <line x1="300" y1="50"  x2="300" y2="550" stroke="currentColor" strokeWidth="0.5" style={{ color: 'var(--neon)' }} />
      </svg>

      <div className="container-lg" ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">
            <span className="animate-pulse" style={{ color: 'var(--neon)' }}>◆</span>
            Future Vision
          </span>
          <h2
            id="vision-heading"
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Beyond Evaluation:{' '}
            <span className="gradient-text">The Decentralized</span>
            <br />
            AI Trust Layer
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg font-body"
            style={{ color: 'var(--text-secondary)' }}
          >
            Abyss AI Labs is building toward a future where AI evaluation is
            verifiable, distributed, and owned by no single entity — a public
            infrastructure for AI trust.
          </p>
        </motion.div>

        {/* Vision grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {visionItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 rounded-2xl border relative overflow-hidden group hover:border-opacity-60 transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 24px rgba(0,0,0,0.3), 0 0 16px var(--neon-glow)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Status badge */}
                <div
                  className="absolute top-4 right-4 text-xs font-mono px-2 py-0.5 rounded-full border"
                  style={{
                    color: item.statusColor,
                    borderColor: item.statusColor,
                    background: `${item.statusColor}15`,
                  }}
                >
                  {item.status}
                </div>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                  style={{
                    background: 'var(--neon-subtle)',
                    borderColor: 'var(--border-strong)',
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--neon)' }} />
                </div>

                <h3
                  className="text-sm font-heading font-semibold mb-2 pr-16"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl border p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border-strong)',
            boxShadow: '0 0 60px var(--neon-glow)',
          }}
        >
          {/* Animated scan line */}
          <div
            className="absolute inset-0 scan-overlay pointer-events-none"
            aria-hidden="true"
          />

          <div
            className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 border"
            style={{
              background: 'var(--neon-subtle)',
              borderColor: 'var(--border-strong)',
              boxShadow: '0 0 30px var(--neon-glow)',
            }}
          >
            <Network size={28} style={{ color: 'var(--neon)' }} />
          </div>

          <h3
            className="text-2xl md:text-3xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Join the{' '}
            <span className="gradient-text">Evaluation Network</span>
          </h3>
          <p
            className="max-w-xl mx-auto text-base font-body mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            Early collaborators gain preferred access to our decentralized
            evaluation infrastructure, tokenized reputation system, and exclusive
            evaluation network participation as we scale.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl font-mono font-semibold text-sm border transition-all duration-200 hover:scale-105"
              style={{
                background: 'var(--neon)',
                borderColor: 'var(--neon)',
                color: '#020709',
              }}
            >
              Express Early Interest
            </button>
            <span
              className="px-6 py-3 rounded-xl font-mono text-sm border flex items-center"
              style={{
                background: 'transparent',
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              No commitment required
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
