import type { Match, Availability, MatchWithAvailability, PlayerName, AvailabilityStatus, Season } from '@/types'
import { AppClient } from '@/components/AppClient'
import { getDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Voorjaar-tab verdwijnt op deze datum (dag ná de laatste voorjaarswedstrijd 23-5-2026).
const VOORJAAR_HIDE_AFTER = '2026-05-24'

export default async function Home() {
  const db = await getDB()

  const matchesRes = await db
    .prepare('SELECT id, round, match_date, opponent, home_away, match_time, season, note FROM dekei1_matches ORDER BY season DESC, round ASC')
    .all<Match>()

  if (!matchesRes.success) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Database Error</h1>
        <pre className="mt-4 text-sm bg-red-50 p-4 rounded overflow-auto">
          {JSON.stringify(matchesRes.error ?? 'unknown', null, 2)}
        </pre>
      </div>
    )
  }

  const availabilityRes = await db
    .prepare('SELECT id, match_id, player_name, status, updated_at FROM dekei1_availability')
    .all<Availability>()

  const matches: Match[] = matchesRes.results ?? []
  const availability: Availability[] = availabilityRes.results ?? []

  const matchesWithAvailability: MatchWithAvailability[] = matches.map((match: Match) => {
    const map: Partial<Record<PlayerName, AvailabilityStatus>> = {}
    for (const a of availability) {
      if (a.match_id === match.id) map[a.player_name as PlayerName] = a.status as AvailabilityStatus
    }
    return { ...match, availability: map }
  })

  const today = new Date().toISOString().slice(0, 10)
  const showVoorjaar = today < VOORJAAR_HIDE_AFTER
  const availableSeasons: Season[] = showVoorjaar ? ['zomer-2026', 'voorjaar-2026'] : ['zomer-2026']

  return (
    <AppClient
      initialMatches={matchesWithAvailability}
      availableSeasons={availableSeasons}
      defaultSeason="zomer-2026"
    />
  )
}
