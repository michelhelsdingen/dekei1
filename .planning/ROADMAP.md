# Roadmap: DE KEI 1 Beschikbaarheid

## Overview

Drie fases van niets naar live: database aanmaken, de app bouwen (één scherm, alles zit erin), en deployen via Coolify. De app is één mobile-first pagina — wedstrijdoverzicht + beschikbaarheid per speler, LTC de Kei huisstijl, direct opslaan.

## Phases

- [x] **Phase 1: Foundation** - Supabase database schema aanmaken en project scaffolding
- [x] **Phase 2: App** - Complete werkende app bouwen — wedstrijden, beschikbaarheid, design, UX
- [ ] **Phase 3: Deploy** - Live zetten via Coolify, DNS via Cloudflare

## Phase Details

### Phase 1: Foundation
**Goal**: Het project staat klaar om gebouwd te worden — database schema bestaat, dev environment werkt
**Depends on**: Nothing (first phase)
**Requirements**: BACK-01
**Success Criteria** (what must be TRUE):
  1. De `dekei1` database op supabase.helsdingen.com heeft een `matches` tabel met de 6 wedstrijden en een `availability` tabel voor spelersstatus
  2. Een Next.js project draait lokaal en kan queries uitvoeren op de Supabase database
  3. De 6 wedstrijden (ronde 1-6, 2026 seizoen) staan als seed data in de database
**Plans**: 1 plan

Plans:
- [x] 01-01-PLAN.md — Database schema (`dekei1` schema in postgres), seed data (6 wedstrijden), Next.js project scaffold met Supabase verbinding

### Phase 2: App
**Goal**: Een volledig werkende mobile-first app waarmee alle 6 spelers hun beschikbaarheid kunnen invullen
**Depends on**: Phase 1
**Requirements**: MATCH-01, MATCH-02, MATCH-03, AVAIL-01, AVAIL-02, AVAIL-03, AVAIL-04, UX-01, UX-02, UX-03, UX-04, DSGN-01, DSGN-02, DSGN-03, BACK-02
**Success Criteria** (what must be TRUE):
  1. Speler opent de app op mobiel en ziet direct alle 6 wedstrijden met datum, tegenstander, thuis/uit badge en tijd
  2. Speler klikt op Ja/Nee/Reserve bij zijn eigen naam — status wordt direct opgeslagen zonder submit-knop, visuele bevestiging volgt
  3. Per wedstrijd is in één oogopslag zichtbaar hoeveel spelers beschikbaar zijn en wat de status is van elk van de 6 spelers
  4. De app heeft LTC de Kei huisstijl (donkerblauw #1B3A5C, oranje #E87722, logo zichtbaar) en werkt prettig op telefoon
  5. Klikken op andermans naam heeft geen effect of vraagt bevestiging — UX beschermt tegen per ongeluk wijzigen
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — LTC de Kei design shell (types, layout, header, wedstrijdoverzicht met thuis/uit badges)
- [x] 02-02-PLAN.md — Beschikbaarheidsinteractie (PlayerSelector, StatusButtons, API route, upsert naar Supabase)

### Phase 3: Deploy
**Goal**: De app is live bereikbaar voor alle teamleden via een domeinnaam
**Depends on**: Phase 2
**Requirements**: BACK-03
**Success Criteria** (what must be TRUE):
  1. De app is bereikbaar via dekei1.ltcdekei.nl
  2. Teamlid opent de URL op de mobiel en de app werkt volledig — beschikbaarheid invullen, direct opgeslagen
  3. Coolify deployment is geconfigureerd zodat een git push automatisch deployt
**Plans**: 1 plan

Plans:
- [ ] 03-01-PLAN.md — GitHub push + Cloudflare DNS + Coolify app deployment

## Progress

**Execution Order:**
Phases execute in order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 1/1 | Complete | 2026-03-10 |
| 2. App | 2/2 | Complete | 2026-03-10 |
| 3. Deploy | 0/1 | Not started | - |
