export type PlayerName = 'Mark' | 'Coen' | 'Bas' | 'Maarten' | 'Niels' | 'Michel'
export type AvailabilityStatus = 'ja' | 'nee' | 'reserve' | null

export interface Match {
  id: string
  round: number
  match_date: string   // "za 4-4-2026"
  match_time: string   // "09:30"
  opponent: string
  home_away: 'home' | 'away'
}

export interface Availability {
  id: string
  match_id: string
  player_name: PlayerName
  status: AvailabilityStatus
  updated_at: string
}

export interface MatchWithAvailability extends Match {
  availability: Partial<Record<PlayerName, AvailabilityStatus>>
}

export const PLAYERS: PlayerName[] = ['Mark', 'Coen', 'Bas', 'Maarten', 'Niels', 'Michel']
