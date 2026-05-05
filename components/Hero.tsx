'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Cpu, Database, Network } from 'lucide-react';

/* ─── Neural Network Canvas Animation ───────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const isDark = document.documentElement.classList.contains('dark');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Node configuration
    const NODE_COUNT = 60;
    const MAX_DIST    = 150;
    const neonColor   = isDark ? '0,255,136' : '5,150,105';

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      r: number; pulse: number;
    }

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    (Math.random() - 0.5) * 0.3,
      r:     Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        // Move
        node.x     += node.vx;
        node.y     += node.vy;
        node.pulse += 0.02;
        if (node.x < 0 || node.x > canvas.width)  node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height)  node.vy *= -1;

        // Draw connections
        nodes.forEach((other) => {
          const dx   = node.x - other.x;
          const dy   = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${neonColor}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw node
        const pulseR = node.r + Math.sin(node.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${neonColor}, 0.5)`;
        ctx.fill();

        // Glow
        const grd = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, pulseR * 4
        );
        grd.addColorStop(0, `rgba(${neonColor}, 0.15)`);
        grd.addColorStop(1, `rgba(${neonColor}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseR * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ─── Typewriter Component ───────────────────────────────────────────────── */
const words = ['AI Responses.', 'Model Outputs.', 'Human Feedback.', 'AI Quality.'];

function Typewriter() {
  const [wordIndex, setWordIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [deleting,  setDeleting]    = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const delay   = deleting ? 40 : charIndex === current.length ? 1800 : 70;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex((c) => c + 1);
      } else if (!deleting && charIndex === current.length) {
        setDeleting(true);
      } else if (deleting && charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex]);

  return (
    <span className="font-mono" style={{ color: 'var(--neon)' }}>
      {words[wordIndex].slice(0, charIndex)}
      <span
        className="inline-block w-0.5 h-[1em] ml-0.5 align-middle"
        style={{
          background: 'var(--neon)',
          animation: 'blink 1s step-end infinite',
        }}
        aria-hidden="true"
      />
    </span>
  );
}

/* ─── Floating Stat Badge ────────────────────────────────────────────────── */
function StatBadge({
  icon: Icon, label, value, delay, position,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  position: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'backOut' }}
      className={`absolute ${position} hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-xl border`}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border-strong)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 12px var(--neon-glow)',
        animation: `float ${5 + delay}s ease-in-out infinite`,
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: 'var(--neon-subtle)' }}
      >
        <Icon size={14} style={{ color: 'var(--neon)' }} />
      </div>
      <div>
        <p className="text-xs font-mono font-bold" style={{ color: 'var(--neon)' }}>
          {value}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */
export default function Hero() {
  const scrollToEvals = () => {
    const el = document.getElementById('evaluations');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero — Abyss AI Labs"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -5%, var(--neon-glow) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Neural network canvas */}
      <div className="absolute inset-0 opacity-60">
        <NeuralCanvas />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            'linear-gradient(to top, var(--background) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating stat badges */}
      <StatBadge
        icon={Cpu}
        label="Evaluations done"
        value="50K+"
        delay={0.8}
        position="top-1/3 left-8 xl:left-24"
      />
      <StatBadge
        icon={Database}
        label="Data points scored"
        value="2M+"
        delay={1.0}
        position="top-1/2 right-8 xl:right-24"
      />
      <StatBadge
        icon={Network}
        label="Accuracy rate"
        value="98.4%"
        delay={1.2}
        position="bottom-1/3 left-12 xl:left-32"
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">

        {/* Pre-badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="badge">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--neon)' }}
            />
            AI Evaluation Agency · Est. 2024
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Human Intelligence
          <br />
          <span className="gradient-text">for Better</span>
          <br />
          <Typewriter />
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl font-body leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Abyss AI Labs combines structured human reasoning with precision
          evaluation frameworks — scoring AI responses for{' '}
          <span style={{ color: 'var(--neon)' }}>accuracy</span>,{' '}
          <span style={{ color: 'var(--neon)' }}>clarity</span>, and{' '}
          <span style={{ color: 'var(--neon)' }}>engagement</span> to help AI
          systems become measurably better.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToContact}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-mono font-semibold text-sm border transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--neon)',
              borderColor: 'var(--neon)',
              color: '#020709',
              boxShadow: '0 0 24px var(--neon-glow)',
            }}
            aria-label="Start a collaboration with Abyss AI Labs"
          >
            Start Collaborating
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <button
            onClick={scrollToEvals}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-mono font-medium text-sm border transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--neon-subtle)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
            aria-label="View sample evaluations"
          >
            View Sample Work
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          {['No upfront commitment', 'Human-verified scores', 'Fast turnaround'].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span style={{ color: 'var(--neon)' }}>✓</span>
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToEvals}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Scroll to evaluations"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
