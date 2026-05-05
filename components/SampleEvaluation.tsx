'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface ScoreSet {
  accuracy:   number; // 0–100
  clarity:    number;
  engagement: number;
}

interface EvalCard {
  id:        number;
  tag:       string;
  prompt:    string;
  responseA: { title: string; text: string; scores: ScoreSet };
  responseB: { title: string; text: string; scores: ScoreSet };
  winner:    'A' | 'B';
  rationale: string;
}

/* ─── Evaluation Data ────────────────────────────────────────────────────── */
const evaluations: EvalCard[] = [
  {
    id: 1,
    tag: 'Factual Explanation',
    prompt:
      'Explain how transformer attention mechanisms work in large language models.',
    responseA: {
      title: 'Response A',
      text: 'Transformers use attention to weigh the importance of each word against all others in a sequence. The attention mechanism computes Query, Key, and Value matrices from embeddings. The dot product of Q and K determines attention scores, which are softmax-normalized to produce weights applied to V.',
      scores: { accuracy: 92, clarity: 78, engagement: 65 },
    },
    responseB: {
      title: 'Response B',
      text: 'Think of attention like a spotlight: every word in a sentence "looks at" every other word and decides how much to focus on it. Technically, the model creates three matrices — Query, Key, and Value — and computes weighted scores so contextually relevant tokens carry more influence, enabling the model to capture long-range dependencies.',
      scores: { accuracy: 94, clarity: 96, engagement: 91 },
    },
    winner: 'B',
    rationale:
      'Response B maintains technical depth while using an accessible analogy. It achieves higher clarity and engagement without sacrificing accuracy — the hallmark of a well-calibrated explanation.',
  },
  {
    id: 2,
    tag: 'Task Completion',
    prompt: 'Write a professional email declining a meeting request politely.',
    responseA: {
      title: 'Response A',
      text: "Subject: Re: Meeting Request\n\nHi [Name],\n\nThank you for reaching out. Unfortunately, I'm unable to attend the proposed meeting. Please reschedule if necessary.\n\nBest,\n[Your Name]",
      scores: { accuracy: 80, clarity: 70, engagement: 45 },
    },
    responseB: {
      title: 'Response B',
      text: "Subject: Re: Meeting Request — Alternative Proposal\n\nHi [Name],\n\nThank you for the invitation. Due to a prior commitment, I won't be able to join on [date]. I'd love to connect — would [alternative date/time] work for you? Alternatively, I'm happy to address any points async via email.\n\nLooking forward to connecting soon.\n\nBest regards,\n[Your Name]",
      scores: { accuracy: 96, clarity: 94, engagement: 89 },
    },
    winner: 'B',
    rationale:
      'Response B demonstrates professional tone, provides an alternative, and maintains warmth. Response A fulfills the request minimally but misses the opportunity to preserve the relationship and offer solutions.',
  },
  {
    id: 3,
    tag: 'Reasoning & Analysis',
    prompt:
      'What are the key risks of deploying a large language model in a healthcare setting?',
    responseA: {
      title: 'Response A',
      text: 'LLMs in healthcare may produce incorrect medical information, leading to patient harm. They can also be biased against certain demographics and may not comply with HIPAA regulations. Data privacy is also a concern.',
      scores: { accuracy: 82, clarity: 76, engagement: 60 },
    },
    responseB: {
      title: 'Response B',
      text: 'Deploying LLMs in healthcare introduces layered risks: (1) Hallucination of clinical facts — models can confidently produce incorrect dosages or diagnoses. (2) Demographic bias — training data imbalances may lead to disparate outcomes. (3) Regulatory non-compliance with HIPAA/GDPR regarding PHI handling. (4) Interpretability gaps — clinicians cannot audit reasoning. (5) Over-reliance — eroding clinician judgment over time. Mitigation requires human oversight, validation pipelines, and domain-specific fine-tuning.',
      scores: { accuracy: 97, clarity: 91, engagement: 88 },
    },
    winner: 'B',
    rationale:
      'Response B provides a structured, numbered analysis covering all critical dimensions with mitigation strategies. It demonstrates analytical depth and structured reasoning — essential in high-stakes domains.',
  },
];

/* ─── Score Bar ──────────────────────────────────────────────────────────── */
function ScoreBar({ label, value, animate }: { label: string; value: number; animate: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        <span className="text-xs font-mono font-semibold" style={{ color: 'var(--neon)' }}>
          {value}
        </span>
      </div>
      <div className="score-bar">
        <motion.div
          className="score-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: animate ? `${value}%` : 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ─── Single Evaluation Card ─────────────────────────────────────────────── */
function EvalCard({ card, index }: { card: EvalCard; index: number }) {
  const ref            = useRef<HTMLDivElement>(null);
  const isInView       = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border overflow-hidden"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
      aria-label={`Evaluation ${card.id}: ${card.tag}`}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border"
            style={{
              background: 'var(--neon-subtle)',
              borderColor: 'var(--border-strong)',
              color: 'var(--neon)',
            }}
          >
            {card.id}
          </span>
          <span className="badge">{card.tag}</span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors"
          style={{
            background: expanded ? 'var(--neon-subtle)' : 'transparent',
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }}
          aria-expanded={expanded}
          aria-controls={`eval-details-${card.id}`}
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Prompt */}
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
          Prompt
        </p>
        <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          "{card.prompt}"
        </p>
      </div>

      {/* Response comparison */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--border)' }}>
        {[
          { r: card.responseA, winner: card.winner === 'A' },
          { r: card.responseB, winner: card.winner === 'B' },
        ].map(({ r, winner }) => (
          <div
            key={r.title}
            className="p-5"
            style={{
              background: winner ? 'var(--neon-subtle)' : 'transparent',
              borderColor: 'var(--border)',
            }}
          >
            {/* Response header */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono font-semibold"
                style={{ color: winner ? 'var(--neon)' : 'var(--text-muted)' }}
              >
                {r.title}
              </span>
              {winner && (
                <span
                  className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--neon)', color: '#020709' }}
                >
                  <Trophy size={10} />
                  Winner
                </span>
              )}
            </div>

            {/* Response text */}
            <p
              className="text-xs font-body leading-relaxed mb-4 whitespace-pre-line"
              style={{ color: 'var(--text-secondary)' }}
            >
              {r.text}
            </p>

            {/* Scores */}
            <div className="space-y-2">
              <ScoreBar label="Accuracy"   value={r.scores.accuracy}   animate={isInView} />
              <ScoreBar label="Clarity"    value={r.scores.clarity}    animate={isInView} />
              <ScoreBar label="Engagement" value={r.scores.engagement} animate={isInView} />
            </div>

            {/* Aggregate */}
            <div className="mt-3 pt-3 border-t flex justify-between items-center" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                Overall Score
              </span>
              <span
                className="text-sm font-mono font-bold"
                style={{ color: winner ? 'var(--neon)' : 'var(--text-secondary)' }}
              >
                {Math.round(
                  (r.scores.accuracy + r.scores.clarity + r.scores.engagement) / 3
                )}
                /100
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Verdict + Rationale */}
      <motion.div
        id={`eval-details-${card.id}`}
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div
          className="px-5 py-4 border-t"
          style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Evaluator Verdict
          </p>
          <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--neon)' }}>
              Response {card.winner} wins.{' '}
            </span>
            {card.rationale}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function SampleEvaluation() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="evaluations"
      className="section-pad relative"
      aria-labelledby="eval-heading"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--neon), transparent)' }}
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
          <span className="badge mb-4">Sample Evaluations</span>
          <h2
            id="eval-heading"
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Evaluation in{' '}
            <span className="gradient-text">Action</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg font-body"
            style={{ color: 'var(--text-secondary)' }}
          >
            Real structured comparisons — see exactly how Abyss AI Labs evaluates
            response quality across Accuracy, Clarity, and Engagement.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-8">
          {evaluations.map((card, i) => (
            <EvalCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center text-xs font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          * Sample evaluations shown for demonstration. Actual evaluations include
          additional dimensions based on client requirements. Expand each card for
          detailed rationale.
        </motion.p>
      </div>
    </section>
  );
}
