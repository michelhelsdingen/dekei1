# Roadmap: DE KEI 1 Beschikbaarheid

## Overview

Drie fases van niets naar live: database aanmaken, de app bouwen (één scherm, alles zit erin), en deployen via Coolify. De app is één mobile-first pagina — wedstrijdoverzicht + beschikbaarheid per speler, LTC de Kei huisstijl, direct opslaan.

## Phases

- [ ] **Phase 1: Foundation** - Supabase database schema aanmaken en project scaffolding
- [ ] **Phase 2: App** - Complete werkende app bouwen — wedstrijden, beschikbaarheid, design, UX
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
**Plans**: TBD

Plans:
- [ ] 01-01: Database schema + seed data + Next.js project setup

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
**Plans**: TBD

Plans:
- [ ] 02-01: Wedstrijdoverzicht UI + LTC de Kei design
- [ ] 02-02: Beschikbaarheid interactie + realtime opslaan + UX bescherming

### Phase 3: Deploy
**Goal**: De app is live bereikbaar voor alle teamleden via een domeinnaam
**Depends on**: Phase 2
**Requirements**: BACK-03
**Success Criteria** (what must be TRUE):
  1. De app is bereikbaar via een publiek URL (bijv. dekei1.helsdingen.com)
  2. Teamlid opent de URL op de mobiel en de app werkt volledig — beschikbaarheid invullen, direct opgeslagen
  3. Coolify deployment is geconfigureerd zodat een git push automatisch deployt
**Plans**: TBD

Plans:
- [ ] 03-01: Coolify deployment + DNS configuratie

## Progress

**Execution Order:**
Phases execute in order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Not started | - |
| 2. App | 0/2 | Not started | - |
| 3. Deploy | 0/1 | Not started | - |
