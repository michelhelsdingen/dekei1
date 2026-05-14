import type { Match, Availability, MatchWithAvailability, PlayerName, AvailabilityStatus } from '@/types'
import { AppClient } from '@/components/AppClient'
import { getDB } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const db = await getDB()

  const matchesRes = await db
    .prepare('SELECT id, round, match_date, opponent, home_away, match_time FROM dekei1_matches ORDER BY round ASC')
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

  return <AppClient initialMatches={matchesWithAvailability} />
}
