'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Handshake, FileCheck, HeartHandshake, Star, Zap } from 'lucide-react';

const trustPillars = [
  {
    icon: Shield,
    title: 'Zero Upfront Risk',
    description:
      'We start with a pilot evaluation batch at no cost. You assess the quality of our work before committing to any ongoing engagement. No contracts, no lock-ins at the outset.',
    metric: '0 cost',
    metricLabel: 'to start',
  },
  {
    icon: FileCheck,
    title: 'Radical Transparency',
    description:
      "Every evaluation comes with full rationale documentation. You see exactly how each score was derived, which rubric criteria applied, and what the evaluator's reasoning was.",
    metric: '100%',
    metricLabel: 'score visibility',
  },
  {
    icon: Handshake,
    title: 'Fair Collaboration',
    description:
      'We operate as genuine partners, not vendors. Pricing is transparent, timelines are communicated clearly, and we proactively flag any quality issues before delivery.',
    metric: 'Fair',
    metricLabel: 'flat-rate pricing',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Partnership',
    description:
      'Our goal is a sustainable relationship, not a one-time transaction. We learn your evaluation criteria over time and improve consistency with every batch.',
    metric: 'Ongoing',
    metricLabel: 'calibration',
  },
];

const testimonialProxies = [
  {
    text: 'The evaluation framework Abyss AI Labs applied was more rigorous than anything we had tried internally. The rubric-based approach eliminated a lot of noise.',
    author: 'AI Research Lead',
    org: 'Series B AI Startup',
    stars: 5,
  },
  {
    text: 'What surprised us was the turnaround time. 48 hours for 500 comparisons, with full rationale notes. It made our RLHF pipeline significantly more efficient.',
    author: 'ML Engineer',
    org: 'Enterprise SaaS Company',
    stars: 5,
  },
  {
    text: "The pilot batch let us verify quality without risk. After seeing the first 50 evaluations, we scaled immediately. It's exactly the proof-of-concept process we needed.",
    author: 'Product Manager',
    org: 'AI Infrastructure Team',
    stars: 5,
  },
];

export default function Trust() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="trust"
      className="section-pad relative"
      aria-labelledby="trust-heading"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--neon), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container-lg" ref={ref}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge mb-4">
            <Zap size={10} />
            Trust & Transparency
          </span>
          <h2
            id="trust-heading"
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Built on{' '}
            <span className="gradient-text">Earned Trust</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg font-body"
            style={{ color: 'var(--text-secondary)' }}
          >
            We believe trust is the foundation of any evaluation service. Our
            commitment to transparency, fairness, and zero-risk onboarding
            reflects our confidence in what we deliver.
          </p>
        </motion.div>

        {/* Trust pillars */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {trustPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border flex gap-5"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Metric sidebar */}
                <div className="flex flex-col items-center min-w-[60px] text-center border-r pr-5" style={{ borderColor: 'var(--border)' }}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border mb-3"
                    style={{
                      background: 'var(--neon-subtle)',
                      borderColor: 'var(--border-strong)',
                    }}
                  >
                    <Icon size={18} style={{ color: 'var(--neon)' }} />
                  </div>
                  <p
                    className="text-xl font-display font-bold"
                    style={{ color: 'var(--neon)' }}
                  >
                    {pillar.metric}
                  </p>
                  <p className="text-xs font-mono leading-tight" style={{ color: 'var(--text-muted)' }}>
                    {pillar.metricLabel}
                  </p>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-base font-heading font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className="text-sm font-body leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3
            className="text-center text-xl font-heading font-semibold mb-8"
            style={{ color: 'var(--text-primary)' }}
          >
            What Collaborators Say
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonialProxies.map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="p-5 rounded-2xl border"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3" aria-label={`${t.stars} stars`}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      fill="var(--neon)"
                      style={{ color: 'var(--neon)' }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm font-body leading-relaxed mb-4 italic"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  &quot;{t.text}&quot;
                </p>
                <footer>
                  <p
                    className="text-sm font-mono font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {t.author}
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {t.org}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
          <p
            className="text-center text-xs font-mono mt-4"
            style={{ color: 'var(--text-muted)' }}
          >
            * Testimonials are representative and attributed by role to protect
            collaborator confidentiality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
