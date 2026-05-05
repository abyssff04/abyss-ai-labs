'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

/**
 * AnimatedSection
 *
 * A reusable scroll-triggered animation wrapper.
 * Wrap any block of content to get a smooth fade-in-up when it enters the viewport.
 *
 * Usage:
 *   <AnimatedSection>
 *     <YourContent />
 *   </AnimatedSection>
 *
 *   <AnimatedSection delay={0.2} direction="left">
 *     <YourCard />
 *   </AnimatedSection>
 */

interface AnimatedSectionProps {
  children:   React.ReactNode;
  className?: string;
  delay?:     number;        // Seconds, default 0
  duration?:  number;        // Seconds, default 0.6
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?:  number;        // px offset, default 24
  once?:      boolean;       // Only animate on first view, default true
  margin?:    string;        // IntersectionObserver rootMargin, default '-80px'
}

const getVariants = (direction: string, distance: number): Variants => {
  const offsets: Record<string, { x?: number; y?: number }> = {
    up:    { y:  distance },
    down:  { y: -distance },
    left:  { x:  distance },
    right: { x: -distance },
    none:  {},
  };

  const offset = offsets[direction] ?? offsets.up;

  return {
    hidden:  { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

export default function AnimatedSection({
  children,
  className,
  delay     = 0,
  duration  = 0.6,
  direction = 'up',
  distance  = 24,
  once      = true,
  margin    = '-80px',
}: AnimatedSectionProps) {
  // React 19: useRef<HTMLDivElement> — always typed to the exact element
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });
  const variants = getVariants(direction, distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedGroup — staggered children animation.
 * Each direct child gets a sequenced delay.
 *
 * Usage:
 *   <AnimatedGroup stagger={0.1}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </AnimatedGroup>
 */
interface AnimatedGroupProps {
  children:   React.ReactNode;
  className?: string;
  stagger?:   number; // Delay between each child, default 0.1s
  delay?:     number; // Initial delay before stagger starts
  once?:      boolean;
  margin?:    string;
}

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.55 },
  },
};

export function AnimatedGroup({
  children,
  className,
  stagger = 0.1,
  delay   = 0,
  once    = true,
  margin  = '-80px',
}: AnimatedGroupProps) {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden:  {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren:   delay,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}
