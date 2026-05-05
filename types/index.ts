/**
 * types/index.ts
 * Shared TypeScript interfaces and types used across the Abyss AI Labs project.
 */

/* ─── Contact Form ─────────────────────────────────────────────────────────── */
export interface ContactFormData {
  name:     string;
  email:    string;
  org?:     string;
  message:  string;
  useCase?: EvaluationUseCase;
}

export type EvaluationUseCase =
  | 'rlhf'
  | 'comparison'
  | 'annotation'
  | 'safety'
  | 'benchmark'
  | 'other';

export type FormState = 'idle' | 'loading' | 'success' | 'error';

/* ─── Evaluation ──────────────────────────────────────────────────────────── */
export interface EvaluationScores {
  accuracy:   number; // 0–100
  clarity:    number; // 0–100
  engagement: number; // 0–100
}

export interface EvaluationResponse {
  title:  string;
  text:   string;
  scores: EvaluationScores;
}

export interface EvaluationCard {
  id:        number;
  tag:       string;
  prompt:    string;
  responseA: EvaluationResponse;
  responseB: EvaluationResponse;
  winner:    'A' | 'B';
  rationale: string;
}

/* ─── Navigation ──────────────────────────────────────────────────────────── */
export interface NavLink {
  label: string;
  href:  string;
}

/* ─── API ─────────────────────────────────────────────────────────────────── */
export interface ApiResponse<T = unknown> {
  data?:    T;
  message?: string;
  error?:   string;
}

/* ─── Theme ───────────────────────────────────────────────────────────────── */
export type Theme = 'dark' | 'light';
