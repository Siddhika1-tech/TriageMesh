create table tasks (
  id uuid primary key default gen_random_uuid(),
  task_input text not null,
  created_at timestamptz not null default now()
);

create table runs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id),
  strategy text not null check (strategy in ('A', 'B', 'C')),
  created_at timestamptz not null default now()
);

create table steps (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references runs(id),
  step_id text not null,
  agent_id text not null,
  input text not null,
  output text not null,
  failure_type text,
  risk_level text,
  confidence_estimate text
);

create table metrics (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references runs(id),
  verification_calls integer not null default 0,
  total_tokens integer not null default 0,
  latency_ms integer not null default 0
);