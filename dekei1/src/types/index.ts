export type PlayerName = 'Mark' | 'Coen' | 'Bas' | 'Maarten' | 'Niels' | 'Michel'
export type AvailabilityStatus = 'ja' | 'nee' | 'reserve' | null
export type Season = 'voorjaar-2026' | 'zomer-2026'

export interface Match {
  id: number
  round: number
  match_date: string   // "2026-04-04"
  match_time: string   // "09:30"
  opponent: string
  home_away: 'home' | 'away'
  season: Season
  note: string | null
}

export interface Availability {
  id: number
  match_id: number
  player_name: PlayerName
  status: AvailabilityStatus
  updated_at: string
}

export interface MatchWithAvailability extends Match {
  availability: Partial<Record<PlayerName, AvailabilityStatus>>
}

export const PLAYERS: PlayerName[] = ['Mark', 'Coen', 'Bas', 'Maarten', 'Niels', 'Michel']

export interface SeasonMeta {
  id: Season
  label: string
  subtitle: string
}

export const SEASON_META: Record<Season, SeasonMeta> = {
  'zomer-2026':    { id: 'zomer-2026',    label: 'Zomer',    subtitle: 'Zomercompetitie 2026' },
  'voorjaar-2026': { id: 'voorjaar-2026', label: 'Voorjaar', subtitle: 'AA Drink Voorjaarscompetitie 2026' },
}
