# Requirements: DE KEI 1 Beschikbaarheid

**Defined:** 2026-03-10
**Core Value:** Per wedstrijd is in één oogopslag duidelijk wie er kan spelen.

## v1 Requirements

### Wedstrijden

- [ ] **MATCH-01**: Gebruiker ziet overzicht van alle 6 wedstrijden met ronde, datum, tegenstander, thuis/uit en aanvangstijd
- [ ] **MATCH-02**: Thuis/uit is visueel duidelijk onderscheiden (bijv. badge of icon)
- [ ] **MATCH-03**: Tegenstander en tijdstip zijn prominent zichtbaar per wedstrijd

### Beschikbaarheid

- [ ] **AVAIL-01**: Speler kan per wedstrijd kiezen: Ja / Nee / Reserve
- [ ] **AVAIL-02**: Keuze wordt direct opgeslagen zonder submit-knop
- [ ] **AVAIL-03**: Huidige status per speler is in één oogopslag zichtbaar met visuele icons
- [ ] **AVAIL-04**: Per wedstrijd is direct te zien hoeveel spelers beschikbaar zijn

### UX

- [ ] **UX-01**: Mobile-first design — primair touch-interface op telefoon
- [ ] **UX-02**: Speler klikt bij eigen naam — UX beschermt tegen per ongeluk ander wijzigen
- [ ] **UX-03**: Visueel aantrekkelijke icons/animaties bij status keuze (beetje fancy)
- [ ] **UX-04**: Responsive — werkt ook op tablet/desktop maar mobiel is prioriteit

### Design

- [ ] **DSGN-01**: LTC de Kei huisstijl: donkerblauw (#1B3A5C), oranje (#E87722)
- [ ] **DSGN-02**: LTC de Kei logo zichtbaar
- [ ] **DSGN-03**: Tennisbal/padel design elementen als accenten

### Backend

- [ ] **BACK-01**: Aparte `dekei1` database op self-hosted Supabase
- [ ] **BACK-02**: Realtime opslaan — klik = direct persisteren
- [ ] **BACK-03**: Deployment via Coolify op plex VPS

## v2 Requirements

### Communicatie

- **COMM-01**: WhatsApp reminder sturen naar spelers die nog niet ingevuld hebben
- **COMM-02**: Automatische samenvatting naar groepsapp na deadline

### Competitie

- **COMP-01**: Competitiestand bijhouden (handmatig of automatisch)
- **COMP-02**: Wedstrijduitslagen invoeren

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authenticatie/login | Team van 6 volwassenen, vertrouwen is genoeg |
| KNLTB scraping | Wedstrijden worden handmatig beheerd, te fragiel |
| Meerdere teams | Dit is puur voor DE KEI 1 |
| Desktop-first design | Iedereen opent het op de mobiel |
| Lineup/opstelling | Niet nodig voor beschikbaarheid |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MATCH-01 | - | Pending |
| MATCH-02 | - | Pending |
| MATCH-03 | - | Pending |
| AVAIL-01 | - | Pending |
| AVAIL-02 | - | Pending |
| AVAIL-03 | - | Pending |
| AVAIL-04 | - | Pending |
| UX-01 | - | Pending |
| UX-02 | - | Pending |
| UX-03 | - | Pending |
| UX-04 | - | Pending |
| DSGN-01 | - | Pending |
| DSGN-02 | - | Pending |
| DSGN-03 | - | Pending |
| BACK-01 | - | Pending |
| BACK-02 | - | Pending |
| BACK-03 | - | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 0
- Unmapped: 17 ⚠️

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-10 after initial definition*
