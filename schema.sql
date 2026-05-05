-- =============================================================================
-- Abyss AI Labs — SQL Schema (PostgreSQL)
-- For future scalability: evaluation records, submissions, evaluators, and more.
-- This schema is NOT required for the core landing page.
-- Integrate when you're ready to persist data (e.g., with Supabase, Neon, etc.)
-- =============================================================================

-- ─── Extensions ─────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ─── Enums ──────────────────────────────────────────────────────────────────

CREATE TYPE eval_use_case AS ENUM (
  'rlhf',
  'comparison',
  'annotation',
  'safety',
  'benchmark',
  'other'
);

CREATE TYPE eval_status AS ENUM (
  'pending',
  'in_review',
  'completed',
  'rejected'
);

CREATE TYPE winner AS ENUM ('A', 'B', 'tie');

-- ─── Contact Submissions ─────────────────────────────────────────────────────
-- Stores contact form leads from the landing page.

CREATE TABLE contact_submissions (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  org         TEXT,
  use_case    eval_use_case,
  message     TEXT        NOT NULL,
  ip_address  INET,                          -- Store for spam detection
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  replied_at  TIMESTAMPTZ,
  notes       TEXT                           -- Internal CRM notes
);

-- Index for fast lookup by email or created date
CREATE INDEX idx_contact_email      ON contact_submissions(email);
CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);

-- ─── Evaluation Batches ───────────────────────────────────────────────────────
-- A batch is a group of evaluation tasks submitted by a client.

CREATE TABLE evaluation_batches (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name     TEXT        NOT NULL,
  client_email    TEXT        NOT NULL,
  use_case        eval_use_case NOT NULL DEFAULT 'comparison',
  status          eval_status   NOT NULL DEFAULT 'pending',
  total_tasks     INT         NOT NULL DEFAULT 0,
  completed_tasks INT         NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  delivered_at    TIMESTAMPTZ,
  notes           TEXT
);

-- ─── Evaluation Tasks ─────────────────────────────────────────────────────────
-- Each task is a single prompt + response pair to be evaluated.

CREATE TABLE evaluation_tasks (
  id                UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id          UUID        NOT NULL REFERENCES evaluation_batches(id) ON DELETE CASCADE,

  -- Input
  prompt            TEXT        NOT NULL,
  response_a        TEXT        NOT NULL,
  response_b        TEXT        NOT NULL,
  metadata          JSONB,                      -- Optional: model names, temperatures, etc.

  -- Scores
  accuracy_a        SMALLINT    CHECK (accuracy_a BETWEEN 0 AND 100),
  accuracy_b        SMALLINT    CHECK (accuracy_b BETWEEN 0 AND 100),
  clarity_a         SMALLINT    CHECK (clarity_a  BETWEEN 0 AND 100),
  clarity_b         SMALLINT    CHECK (clarity_b  BETWEEN 0 AND 100),
  engagement_a      SMALLINT    CHECK (engagement_a BETWEEN 0 AND 100),
  engagement_b      SMALLINT    CHECK (engagement_b BETWEEN 0 AND 100),

  -- Verdict
  winner            winner,
  rationale         TEXT,                        -- Evaluator's written rationale

  -- Status
  status            eval_status NOT NULL DEFAULT 'pending',
  evaluator_id      UUID        REFERENCES evaluators(id),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at      TIMESTAMPTZ
);

CREATE INDEX idx_tasks_batch_id  ON evaluation_tasks(batch_id);
CREATE INDEX idx_tasks_status    ON evaluation_tasks(status);
CREATE INDEX idx_tasks_evaluator ON evaluation_tasks(evaluator_id);

-- ─── Evaluators ───────────────────────────────────────────────────────────────
-- Internal evaluator profiles with calibration tracking.

CREATE TABLE evaluators (
  id                UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT        NOT NULL,
  email             TEXT        UNIQUE NOT NULL,
  domains           TEXT[]      NOT NULL DEFAULT '{}',  -- e.g. ['medical', 'legal']
  calibration_score NUMERIC(5,2),                       -- 0.00 – 100.00
  tasks_completed   INT         NOT NULL DEFAULT 0,
  active            BOOLEAN     NOT NULL DEFAULT TRUE,
  joined_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Evaluation Dimension Scores (Normalized) ─────────────────────────────────
-- Optional normalized table if you add custom scoring dimensions per batch.

CREATE TABLE dimension_scores (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id      UUID        NOT NULL REFERENCES evaluation_tasks(id) ON DELETE CASCADE,
  dimension    TEXT        NOT NULL,   -- e.g. 'safety', 'instruction_following'
  score_a      SMALLINT    CHECK (score_a BETWEEN 0 AND 100),
  score_b      SMALLINT    CHECK (score_b BETWEEN 0 AND 100),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_dim_scores_task ON dimension_scores(task_id);

-- ─── Auto-update updated_at trigger ──────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_batches_updated
  BEFORE UPDATE ON evaluation_batches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Useful Views ─────────────────────────────────────────────────────────────

-- Batch progress summary
CREATE VIEW batch_progress AS
SELECT
  b.id,
  b.client_name,
  b.status,
  b.total_tasks,
  b.completed_tasks,
  ROUND(b.completed_tasks::NUMERIC / NULLIF(b.total_tasks, 0) * 100, 1) AS progress_pct,
  b.created_at,
  b.delivered_at
FROM evaluation_batches b;

-- Average scores per batch
CREATE VIEW batch_score_summary AS
SELECT
  t.batch_id,
  COUNT(*)                              AS total_tasks,
  ROUND(AVG(t.accuracy_a),   1)         AS avg_accuracy_a,
  ROUND(AVG(t.accuracy_b),   1)         AS avg_accuracy_b,
  ROUND(AVG(t.clarity_a),    1)         AS avg_clarity_a,
  ROUND(AVG(t.clarity_b),    1)         AS avg_clarity_b,
  ROUND(AVG(t.engagement_a), 1)         AS avg_engagement_a,
  ROUND(AVG(t.engagement_b), 1)         AS avg_engagement_b,
  SUM(CASE WHEN t.winner = 'A' THEN 1 ELSE 0 END) AS wins_a,
  SUM(CASE WHEN t.winner = 'B' THEN 1 ELSE 0 END) AS wins_b,
  SUM(CASE WHEN t.winner = 'tie' THEN 1 ELSE 0 END) AS ties
FROM evaluation_tasks t
WHERE t.status = 'completed'
GROUP BY t.batch_id;
