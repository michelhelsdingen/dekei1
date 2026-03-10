# DE KEI 1 — Competitie Beschikbaarheid

## What This Is

Een strakke, mobile-first web app voor padel team DE KEI 1 (LTC de Kei, Lichtenvoorde) om beschikbaarheid per competitiewedstrijd bij te houden. 6 spelers geven per ronde aan of ze Ja / Nee / Reserve zijn. Eenvoudig, direct, in de LTC de Kei huisstijl.

## Core Value

Per wedstrijd is in één oogopslag duidelijk wie er kan spelen.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Overzicht van 6 wedstrijden met datum, tegenstander, thuis/uit, tijd
- [ ] 6 spelers (Mark, Coen, Bas, Maarten, Niels, Michel) per wedstrijd
- [ ] Beschikbaarheid: Ja / Nee / Reserve per speler per wedstrijd
- [ ] Keuze wordt direct opgeslagen (geen submit-knop)
- [ ] UX bescherming tegen per ongeluk iemand anders wijzigen
- [ ] Mobile-first design (primair gebruik op telefoon)
- [ ] LTC de Kei huisstijl (donkerblauw, oranje, tennisbal elementen)
- [ ] Self-hosted op Coolify (plex VPS)
- [ ] Aparte `dekei1` database op self-hosted Supabase

### Out of Scope

- Authenticatie/login — vertrouwen op volwassen teamgenoten
- KNLTB scraping — wedstrijden worden hardcoded/handmatig beheerd
- Competitiestand — misschien later
- WhatsApp reminders — misschien later
- Desktop-first design — mobiel is prioriteit

## Context

### Team
- **Club**: L.T.C. de Kei, Kerkhoflaan 3, 7131 TE Lichtenvoorde
- **Team**: DE KEI 1
- **Spelers**: Mark, Coen, Bas, Maarten, Niels, Michel (6 spelers)

### Competitie 2026

| Ronde | Datum | Tegenstander | Thuis/Uit | Tijd |
|-------|-------|-------------|-----------|------|
| 1 | za 4-4-2026 | TEZ 3 | Thuis | 09:30 |
| 2 | za 11-4-2026 | QUICK-OLDENZAAL 4 | Uit | 14:00 |
| 3 | za 18-4-2026 | WINTERSWIJK 3 | Thuis | 09:30 |
| 4 | za 9-5-2026 | TEZ 3 | Uit | 10:00 |
| 5 | za 16-5-2026 | QUICK-OLDENZAAL 4 | Thuis | 09:30 |
| 6 | za 23-5-2026 | WINTERSWIJK 3 | Uit | 13:00 |

### Huisstijl
- **Kleuren**: Donkerblauw (navy ~#1B3A5C), Oranje (~#E87722)
- **Logo**: "LTC de Kei" met tennisbal element
- **Design elementen**: Dikke donkerblauwe zijbalk, oranje accenten, tennisbal silhouet
- **Assets**: `/Users/michelhelsdingen/Desktop/Huisstijl LTC en OG/LTC/Huisstijl/`

### Infra
- **Database**: `dekei1` database op `supabase.helsdingen.com` (self-hosted, aparte DB van CashSpot)
- **Supabase SQL endpoint**: `https://supabase.helsdingen.com/pg/query` (service role key)
- **Deployment**: Coolify op plex VPS (`coolify.helsdingen.com`)

### Vorige versie
- Bestaat in `padel-team-pro/` — Next.js 15 app met meerdere UI varianten
- Gebruikte hosted Supabase (nu gepauzeerd en onherstelbaar)
- Overkill: 8+ pagina varianten, Prisma schema, Playwright scraper, NextAuth
- Nieuwe versie moet veel simpeler en strakker

## Constraints

- **Mobile-first**: Primair gebruik op telefoon — alles moet touch-friendly zijn
- **Simpelheid**: Geen over-engineering. Eén pagina, direct bruikbaar
- **Snelheid**: Klikken = direct opslaan, geen loading states van seconden
- **Huisstijl**: LTC de Kei branding is verplicht (niet generiek)
- **Database**: Aparte `dekei1` database, niet in CashSpot schema

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Self-hosted Supabase i.p.v. hosted | Hosted projects worden gepauzeerd na inactiviteit | — Pending |
| Aparte database i.p.v. schema/tabellen | Totale scheiding van CashSpot data | ✓ Good |
| Geen auth | Team van 6 volwassenen, vertrouwen is genoeg | — Pending |
| Ja/Nee/Reserve i.p.v. Ja/Nee/Misschien | Reserve is specifieker dan misschien voor teamplanning | — Pending |
| Mobile-first | Iedereen opent het op de mobiel | — Pending |

---
*Last updated: 2026-03-10 after initialization*
