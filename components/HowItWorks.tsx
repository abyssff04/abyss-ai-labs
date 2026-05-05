'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ClipboardList,
  Users,
  BarChart3,
  ShieldCheck,
  Package,
} from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Submit Your Task',
    description:
      'Share your prompts, AI responses, or evaluation criteria through our secure intake portal. We support bulk uploads, CSV, or direct API submission.',
    detail: 'We handle: RLHF datasets, response comparisons, annotation tasks',
  },
  {
    icon: Users,
    number: '02',
    title: 'Expert Human Review',
    description:
      'Trained evaluators with domain expertise review each submission against structured rubrics. Every evaluation is assigned to reviewers matched to the content domain.',
    detail: 'Multi-reviewer validation on all critical evaluations',
  },
  {
    icon: BarChart3,
    number: '03',
    title: 'Structured Scoring',
    description:
      'Responses are scored across defined dimensions: Accuracy, Clarity, Engagement, Safety, and Instruction-Following. Each dimension has explicit rubrics.',
    detail: 'Scores are calibrated and bias-checked before delivery',
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'Quality Assurance',
    description:
      'A dedicated QA layer reviews all scored evaluations for consistency, outlier detection, and inter-rater reliability before final approval.',
    detail: 'Target inter-rater agreement: >90% on all batches',
  },
  {
    icon: Package,
    number: '05',
    title: 'Structured Delivery',
    description:
      'Receive your evaluation data in structured formats — JSON, CSV, or via API — complete with score breakdowns, rationale notes, and actionable insights.',
    detail: 'Turnaround: 24–72 hours depending on volume',
  },
];

/* ─── Single Step ────────────────────────────────────────────────────────── */
function Step({
  step,
  index,
  isLast,
  isInView,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
  isInView: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Connector line (vertical) */}
      {!isLast && (
        <div
          className="absolute left-5 top-14 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(to bottom, var(--neon-glow), transparent)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Icon column */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.1, ease: 'backOut' }}
          className="relative w-10 h-10 rounded-xl border flex items-center justify-center"
          style={{
            background: 'var(--neon-subtle)',
            borderColor: 'var(--border-strong)',
            boxShadow: '0 0 16px var(--neon-glow)',
          }}
          aria-hidden="true"
        >
          <Icon size={18} style={{ color: 'var(--neon)' }} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-mono font-bold tracking-widest"
            style={{ color: 'var(--neon)' }}
          >
            {step.number}
          </span>
          <h3
            className="text-lg font-heading font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {step.title}
          </h3>
        </div>
        <p
          className="text-sm font-body leading-relaxed mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {step.description}
        </p>
        <div
          className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full"
          style={{
            background: 'var(--neon-subtle)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
          }}
        >
          <span style={{ color: 'var(--neon)' }}>›</span>
          {step.detail}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function HowItWorks() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="how-it-works"
      className="section-pad relative"
      aria-labelledby="hiw-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, var(--neon-subtle) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-lg" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: header + summary */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="badge mb-4">Process</span>
              <h2
                id="hiw-heading"
                className="text-4xl md:text-5xl font-heading font-bold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                Five Steps to{' '}
                <span className="gradient-text">Precision</span>
              </h2>
              <p
                className="text-lg font-body leading-relaxed mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Our evaluation pipeline is built for consistency, speed, and
                trust. From intake to delivery, every step is tracked and
                documented.
              </p>

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '24h',  label: 'Average turnaround' },
                  { value: '>90%', label: 'Inter-rater agreement' },
                  { value: '5+',   label: 'Evaluation dimensions' },
                  { value: '100%', label: 'Human-verified' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl border"
                    style={{
                      background: 'var(--surface)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <p
                      className="text-2xl font-display font-bold mb-1"
                      style={{ color: 'var(--neon)' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: steps */}
          <div>
            {steps.map((step, i) => (
              <Step
                key={step.number}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
