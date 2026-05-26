-- Zomer R3 Seven Aeren verplaatst van 13 juni naar 4 juli (inhaaldag).
-- Reden: Seven Aeren had een spelersprobleem op 13 juni; beide teams akkoord met verplaatsing.
-- 2026-05-26

UPDATE dekei1_matches
   SET match_date = '2026-07-04',
       note = 'Verplaatst van 13 juni naar 4 juli (inhaaldag) — spelersprobleem Seven Aeren'
 WHERE season = 'zomer-2026'
   AND round = 3
   AND opponent = 'SEVEN AEREN 1';
