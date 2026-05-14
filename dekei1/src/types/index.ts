export type PlayerName = 'Mark' | 'Coen' | 'Bas' | 'Maarten' | 'Niels' | 'Michel'
export type AvailabilityStatus = 'ja' | 'nee' | 'reserve' | null

export interface Match {
  id: number
  round: number
  match_date: string   // "2026-04-04"
  match_time: string   // "09:30"
  opponent: string
  home_away: 'home' | 'away'
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
