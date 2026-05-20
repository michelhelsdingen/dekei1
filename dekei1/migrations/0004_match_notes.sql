-- Match-notitie kolom voor waarschuwingen per wedstrijd (datum-verzoek, locatie-wijziging, etc.)
-- 2026-05-20

ALTER TABLE dekei1_matches ADD COLUMN note TEXT;

-- Initiële notitie: Mallumse Molen (zomer R1) vraagt om nieuwe datum.
UPDATE dekei1_matches
   SET note = 'Tegenstander heeft verzocht om een nieuwe datum'
 WHERE season = 'zomer-2026'
   AND round = 1
   AND opponent = 'MALLUMSE MOLEN 1';
