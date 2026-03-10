---
phase: 01-foundation
plan: 01
subsystem: database
tags: [supabase, nextjs, postgres, tailwind, typescript]

requires: []

provides:
  - "public.dekei1_matches table with 6 wedstrijden (ronde 1-6, seizoen 2026)"
  - "public.dekei1_availability table with FK naar matches en UNIQUE(match_id, player_name)"
  - "Next.js 16.1.6 project op /Users/michelhelsdingen/Documents/dekei1/dekei1/"
  - "Supabase client geconfigureerd voor public schema (dekei1_ prefix tabellen)"
  - "Homepage die alle 6 wedstrijden ophaalt en toont via Server Component"

affects: ["02-app", "03-deploy"]

tech-stack:
  added:
    - "Next.js 16.1.6 (App Router, TypeScript, Tailwind CSS)"
    - "@supabase/supabase-js"
  patterns:
    - "Supabase public schema met dekei1_ prefix voor namespace isolatie"
    - "Next.js Server Components voor database queries"

key-files:
  created:
    - "dekei1/src/lib/supabase.ts"
    - "dekei1/src/app/page.tsx"
    - "dekei1/.env.local"
    - "dekei1/scripts/setup-db.sh"
  modified: []

key-decisions:
  - "Tabellen in public schema met dekei1_ prefix: PostgREST op deze self-hosted Supabase exposeert alleen public schema (niet de dekei1 custom schema)"
  - "dekei1 schema ook aangemaakt in postgres DB (voor directe SQL queries via pg/query endpoint), maar PostgREST tabellen zitten in public"
  - "Supabase client gebruikt geen schema override — from('dekei1_matches') werkt direct"
  - "Next.js Server Component voor homepage: database query server-side, geen API route nodig"

requirements-completed:
  - BACK-01

duration: 7min
completed: 2026-03-10
---

# Phase 01 Plan 01: Foundation Summary

**`dekei1_matches` (6 wedstrijden) en `dekei1_availability` tabellen live in Supabase; Next.js 16.1.6 project met Server Component die alle 6 ronden toont via @supabase/supabase-js**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-10T19:51:57Z
- **Completed:** 2026-03-10T19:59:47Z
- **Tasks:** 2
- **Files modified:** 19

## Accomplishments

- `public.dekei1_matches` aangemaakt met 6 seed wedstrijden (TEZ 3, QUICK-OLDENZAAL 4, WINTERSWIJK 3 — ronde 1-6)
- `public.dekei1_availability` aangemaakt met foreign key en UNIQUE(match_id, player_name) constraint
- Next.js 16.1.6 project scaffolded met TypeScript + Tailwind CSS in `/Users/michelhelsdingen/Documents/dekei1/dekei1/`
- Supabase client geconfigureerd; homepage haalt alle 6 wedstrijden op en toont ze
- `npm run build` en `npm run dev` slagen zonder errors

## Task Commits

1. **Task 1: Database schema aanmaken en seed data invoeren** - `e6c33ea` (feat)
2. **Task 2: Next.js project scaffolden met Supabase verbinding** - `f6cdf99` (feat)

## Files Created/Modified

- `dekei1/scripts/setup-db.sh` - Shell script voor DB setup via Supabase pg/query API
- `dekei1/src/lib/supabase.ts` - Supabase client (public schema, anon key)
- `dekei1/src/app/page.tsx` - Server Component die dekei1_matches ophaalt en toont
- `dekei1/.env.local` - Supabase URL en keys
- `dekei1/package.json` - Next.js 16, @supabase/supabase-js, Tailwind CSS
- `dekei1/next.config.ts` - Next.js configuratie

## Decisions Made

**PostgREST schema keuze:** De geplande `dekei1` schema benadering (via Accept-Profile header) werkte niet — deze self-hosted Supabase exposeert alleen `public`, `storage`, en `graphql_public` via PostgREST. Gekozen voor plan-fallback: tabellen in `public` schema met `dekei1_` prefix.

**pg/query endpoint auth:** Endpoint vereist `apikey` header i.p.v. `Authorization: Bearer` — gecorrigeerd in setup script.

**Tabel namen:** `public.dekei1_matches` en `public.dekei1_availability` i.p.v. `dekei1.matches` en `dekei1.availability`. Phase 2 moet `supabase.from('dekei1_matches')` gebruiken (niet `from('matches')`).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] PostgREST exposeert geen dekei1 schema**
- **Found during:** Task 1 (database schema aanmaken)
- **Issue:** `Accept-Profile: dekei1` header geeft PGRST106 error: "Only the following schemas are exposed: public, storage, graphql_public"
- **Fix:** Fallback aanpak uit plan gebruikt: tabellen aangemaakt in `public` schema met `dekei1_` prefix. Supabase client aangepast: geen `db.schema` optie, `from('dekei1_matches')` i.p.v. `from('matches')`
- **Files modified:** dekei1/scripts/setup-db.sh, dekei1/src/lib/supabase.ts
- **Verification:** curl PostgREST `/rest/v1/dekei1_matches` retourneert 6 rijen
- **Committed in:** e6c33ea, f6cdf99

**2. [Rule 1 - Bug] pg/query endpoint auth format**
- **Found during:** Task 1 (eerste run van setup script)
- **Issue:** `Authorization: Bearer` header geeft "No API key found in request" — endpoint verwacht `apikey` header
- **Fix:** Header aangepast naar `apikey: ${SERVICE_ROLE_KEY}` in setup script
- **Files modified:** dekei1/scripts/setup-db.sh
- **Verification:** pg/query retourneert `[]` (success) i.p.v. error
- **Committed in:** e6c33ea

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact op plan:** Beide fixes noodzakelijk voor database connectie. PostgREST schema aanpak is voorzien als fallback in plan — geen scope creep.

## Issues Encountered

- pg/query endpoint retourneert type-schema's i.p.v. actuele data (self-hosted Supabase quirk). Verificatie via PostgREST REST endpoint of `to_json(array_agg(...))` workaround werkt wel. Database bevat correct 6 rijen (bevestigd via PostgREST).

## User Setup Required

None - geen externe service configuratie vereist. Supabase credentials staan in .env.local.

## Next Phase Readiness

- Database klaar: 6 wedstrijden in `public.dekei1_matches`, `public.dekei1_availability` met correcte constraints
- Next.js project klaar op `/Users/michelhelsdingen/Documents/dekei1/dekei1/`
- **Belangrijk voor Phase 2:** Gebruik `supabase.from('dekei1_matches')` en `supabase.from('dekei1_availability')` (public schema, dekei1_ prefix — geen schema optie)

---
*Phase: 01-foundation*
*Completed: 2026-03-10*

## Self-Check: PASSED
