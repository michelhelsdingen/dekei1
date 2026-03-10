#!/bin/bash
# setup-db.sh — Create dekei1 tables and seed data in Supabase (public schema, dekei1_ prefix)
#
# NOTE: PostgREST on this self-hosted Supabase only exposes the `public` schema.
# Tables are created in `public` with `dekei1_` prefix for namespace isolation.
# The Supabase JS client connects to `public` schema (default) and uses
# supabase.from('dekei1_matches') etc.

SUPABASE_URL="https://supabase.helsdingen.com"
SERVICE_ROLE_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDEzNzA0MCwiZXhwIjo0OTI1ODEwNjQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.ZwsJBNKHwJ2Kz6Ug1o8YOa1_J1dRtj2oFLG-Ai5bIi8"
ANON_KEY="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDEzNzA0MCwiZXhwIjo0OTI1ODEwNjQwLCJyb2xlIjoiYW5vbiJ9.67qHa8j6CPdrN2R0asjJ1R2TCgjdOY5Egl4K3mL58co"

run_query() {
  local query="$1"
  local description="$2"
  echo "--- $description ---"
  result=$(curl -s -X POST "${SUPABASE_URL}/pg/query" \
    -H "Content-Type: application/json" \
    -H "apikey: ${SERVICE_ROLE_KEY}" \
    --data-raw "{\"query\": $(python3 -c "import json,sys; print(json.dumps(sys.argv[1]))" "$query")}")
  echo "$result"
  echo ""
}

echo "=== Step 1: Create tables (public schema, dekei1_ prefix) ==="

run_query "CREATE TABLE IF NOT EXISTS public.dekei1_matches (
  id SERIAL PRIMARY KEY,
  round INTEGER NOT NULL,
  match_date DATE NOT NULL,
  opponent TEXT NOT NULL,
  home_away TEXT NOT NULL CHECK (home_away IN ('home', 'away')),
  match_time TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
)" "Create dekei1_matches table"

run_query "CREATE TABLE IF NOT EXISTS public.dekei1_availability (
  id SERIAL PRIMARY KEY,
  match_id INTEGER NOT NULL REFERENCES public.dekei1_matches(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL CHECK (player_name IN ('Mark', 'Coen', 'Bas', 'Maarten', 'Niels', 'Michel')),
  status TEXT NOT NULL DEFAULT 'unknown' CHECK (status IN ('yes', 'no', 'reserve', 'unknown')),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(match_id, player_name)
)" "Create dekei1_availability table"

echo "=== Step 2: Seed data (idempotent) ==="

run_query "INSERT INTO public.dekei1_matches (round, match_date, opponent, home_away, match_time)
SELECT * FROM (VALUES
  (1, '2026-04-04'::DATE, 'TEZ 3', 'home', '09:30'::TIME),
  (2, '2026-04-11'::DATE, 'QUICK-OLDENZAAL 4', 'away', '14:00'::TIME),
  (3, '2026-04-18'::DATE, 'WINTERSWIJK 3', 'home', '09:30'::TIME),
  (4, '2026-05-09'::DATE, 'TEZ 3', 'away', '10:00'::TIME),
  (5, '2026-05-16'::DATE, 'QUICK-OLDENZAAL 4', 'home', '09:30'::TIME),
  (6, '2026-05-23'::DATE, 'WINTERSWIJK 3', 'away', '13:00'::TIME)
) AS v(round, match_date, opponent, home_away, match_time)
WHERE NOT EXISTS (SELECT 1 FROM public.dekei1_matches)" "Insert seed data"

echo "=== Step 3: Verify via PostgREST ==="

echo "Checking matches count..."
result=$(curl -s "${SUPABASE_URL}/rest/v1/dekei1_matches?select=*&order=round" \
  -H "apikey: ${ANON_KEY}")
count=$(echo "$result" | python3 -c "import sys,json; data=json.load(sys.stdin); print(len(data))" 2>/dev/null || echo "error")
echo "Matches found: $count"

if [ "$count" = "6" ]; then
  echo "OK: 6 matches found in database"
else
  echo "WARNING: Expected 6 matches, got $count"
  echo "$result"
fi
