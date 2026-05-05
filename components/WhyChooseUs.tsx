'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Brain,
  Scale,
  Clock,
  Eye,
  Users,
  Layers,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Structured Reasoning',
    description:
      'Our evaluators apply explicit, rubric-driven reasoning — not gut instinct. Every score is anchored to defined criteria, making results reproducible and defensible.',
    highlight: 'Rubric-driven evaluation frameworks',
  },
  {
    icon: Scale,
    title: 'Consistency at Scale',
    description:
      'Through calibration sessions, inter-rater reliability checks, and statistical quality control, we maintain scoring consistency across thousands of evaluations.',
    highlight: '>90% inter-rater agreement target',
  },
  {
    icon: Eye,
    title: 'Human-Centered Assessment',
    description:
      "AI metrics miss what humans feel. Our evaluators assess responses the way real users do — catching tone mismatches, nuance failures, and trust signals that automated tools can't.",
    highlight: 'Real user perspective at every step',
  },
  {
    icon: Clock,
    title: 'Fast, Reliable Turnaround',
    description:
      'Standard batches delivered in 24–72 hours. Expedited processing available for time-sensitive pipelines. Never miss your training schedule.',
    highlight: '24h standard · 12h expedited',
  },
  {
    icon: Users,
    title: 'Domain-Matched Expertise',
    description:
      'Evaluators are matched to tasks based on domain expertise — medical, legal, technical, creative. Specialized knowledge means better calibrated judgments.',
    highlight: 'Specialists for every domain',
  },
  {
    icon: Layers,
    title: 'Multi-Dimensional Scoring',
    description:
      'We evaluate across Accuracy, Clarity, Engagement, Safety, Instruction-Following, and custom dimensions tailored to your model\'s objectives and deployment context.',
    highlight: '6+ scoring dimensions standard',
  },
];

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group p-6 rounded-2xl border transition-all duration-300 cursor-default"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.3), 0 0 20px var(--neon-glow)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'var(--neon-subtle)',
          borderColor: 'var(--border-strong)',
        }}
        aria-hidden="true"
      >
        <Icon size={20} style={{ color: 'var(--neon)' }} />
      </div>

      <h3
        className="text-base font-heading font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {feature.title}
      </h3>

      <p
        className="text-sm font-body leading-relaxed mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {feature.description}
      </p>

      <div
        className="flex items-center gap-1.5 text-xs font-mono"
        style={{ color: 'var(--neon)' }}
      >
        <span>→</span>
        {feature.highlight}
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="why-us"
      className="section-pad relative"
      aria-labelledby="why-heading"
    >
      {/* Background grid accent */}
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

      <div className="container-lg" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">Why Abyss AI Labs</span>
          <h2
            id="why-heading"
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Built for the{' '}
            <span className="gradient-text">AI Era</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg font-body"
            style={{ color: 'var(--text-secondary)' }}
          >
            We combine the nuance of human judgment with the rigor of structured
            evaluation — delivering quality assessments that scale with your AI
            pipeline.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom comparison bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 p-6 md:p-8 rounded-2xl border"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border-strong)',
            boxShadow: '0 0 40px var(--neon-glow)',
          }}
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                label: 'vs. Automated Metrics',
                desc: 'Automated metrics (BLEU, ROUGE) miss intent, nuance, and user experience. Human evaluation captures what matters.',
                advantage: 'Human judgment wins',
              },
              {
                label: 'vs. Crowdsourced Platforms',
                desc: 'Generic crowd workers lack calibration and consistency. Our evaluators are trained, domain-matched, and quality-checked.',
                advantage: 'Expertise & consistency',
              },
              {
                label: 'vs. In-House Teams',
                desc: 'Building internal evaluation capacity is expensive and slow. We offer immediate scale with proven frameworks.',
                advantage: 'Speed & cost efficiency',
              },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="text-xs font-mono font-semibold mb-2"
                  style={{ color: 'var(--neon)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm font-body mb-3"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.desc}
                </p>
                <span
                  className="badge"
                  style={{ color: 'var(--neon)', borderColor: 'var(--border-strong)' }}
                >
                  ✓ {item.advantage}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
