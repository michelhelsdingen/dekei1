-- Zomercompetitie 2026 + seizoens-kolom
-- 2026-05-20: voeg `season` toe en seed 5 zomerwedstrijden.

ALTER TABLE dekei1_matches ADD COLUMN season TEXT NOT NULL DEFAULT 'voorjaar-2026';

CREATE INDEX IF NOT EXISTS idx_matches_season ON dekei1_matches(season);

INSERT INTO dekei1_matches (round, match_date, opponent, home_away, match_time, season) VALUES
  (1, '2026-05-30', 'MALLUMSE MOLEN 1',     'home', '09:30', 'zomer-2026'),
  (2, '2026-06-06', 'Padel Inside Zwolle 1','away', '13:00', 'zomer-2026'),
  (3, '2026-06-13', 'SEVEN AEREN 1',        'home', '09:30', 'zomer-2026'),
  (4, '2026-06-20', 'BAKKERSHAAG 1',        'home', '09:30', 'zomer-2026'),
  (5, '2026-06-27', 'DOESBURG 1',           'away', '13:00', 'zomer-2026');
