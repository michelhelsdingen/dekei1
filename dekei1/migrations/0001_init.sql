-- D1 schema voor dekei1 — gemigreerd van zelf-gehoste Supabase 2026-05-14.

CREATE TABLE IF NOT EXISTS dekei1_matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  round INTEGER NOT NULL,
  match_date TEXT NOT NULL,
  opponent TEXT NOT NULL,
  home_away TEXT NOT NULL CHECK (home_away IN ('home','away')),
  match_time TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dekei1_availability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  match_id INTEGER NOT NULL REFERENCES dekei1_matches(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL CHECK (player_name IN ('Mark','Coen','Bas','Maarten','Niels','Michel')),
  status TEXT NOT NULL DEFAULT 'unknown' CHECK (status IN ('ja','nee','reserve','unknown')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(match_id, player_name)
);

CREATE INDEX IF NOT EXISTS idx_availability_match ON dekei1_availability(match_id);
