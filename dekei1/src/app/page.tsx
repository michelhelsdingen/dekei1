import { supabase } from '@/lib/supabase'
import type { MatchWithAvailability, PlayerName, AvailabilityStatus } from '@/types'
import { AppClient } from '@/components/AppClient'

// Always fetch fresh data from DB — never serve stale static HTML
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Load matches
  const { data: matches, error: matchError } = await supabase
    .from('dekei1_matches')
    .select('*')
    .order('round', { ascending: true })

  if (matchError) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Database Error</h1>
        <pre className="mt-4 text-sm bg-red-50 p-4 rounded overflow-auto">
          {JSON.stringify(matchError, null, 2)}
        </pre>
      </div>
    )
  }

  // Load all availability
  const { data: availability } = await supabase
    .from('dekei1_availability')
    .select('*')

  // Combine: per match an availability map
  const matchesWithAvailability: MatchWithAvailability[] = (matches ?? []).map(match => {
    const matchAvailability = (availability ?? []).filter(
      (a: { match_id: string }) => a.match_id === match.id
    )
    const availabilityMap: Partial<Record<PlayerName, AvailabilityStatus>> = {}
    matchAvailability.forEach((a: { player_name: string; status: string }) => {
      availabilityMap[a.player_name as PlayerName] = a.status as AvailabilityStatus
    })
    return { ...match, availability: availabilityMap }
  })

  return <AppClient initialMatches={matchesWithAvailability} />
}
