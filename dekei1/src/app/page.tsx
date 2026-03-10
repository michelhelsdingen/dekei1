import { supabase } from '@/lib/supabase'
import type { MatchWithAvailability, PlayerName, AvailabilityStatus } from '@/types'
import { PLAYERS } from '@/types'

function TennisBallSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" className="opacity-20">
      <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="3" />
      <path d="M4 24 Q14 14 24 24 Q34 34 44 24" fill="none" stroke="white" strokeWidth="2" />
      <path d="M4 24 Q14 34 24 24 Q34 14 44 24" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  )
}

function StatusPlaceholder({ status }: { status: AvailabilityStatus }) {
  if (status === 'ja') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
        ✓ Ja
      </span>
    )
  }
  if (status === 'nee') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
        ✕ Nee
      </span>
    )
  }
  if (status === 'reserve') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
        ⏱ Reserve
      </span>
    )
  }
  return (
    <div className="flex gap-1">
      {['Ja', 'Nee', 'Res'].map((label) => (
        <button
          key={label}
          disabled
          className="px-2 py-1 rounded text-xs border border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function MatchCard({ match }: { match: MatchWithAvailability }) {
  const availableCount = Object.values(match.availability).filter(s => s === 'ja').length

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: '#1B3A5C' }}
        >
          R{match.round}
        </span>
        <div className="flex-1 ml-3 min-w-0">
          <div className="font-bold text-gray-900 text-lg truncate">{match.opponent}</div>
          <div className="text-sm text-gray-500">{match.match_date} · {match.match_time}</div>
        </div>
        <span
          className="flex-shrink-0 ml-2 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: match.home_away === 'home' ? '#1B3A5C' : '#E87722' }}
        >
          {match.home_away === 'home' ? 'THUIS' : 'UIT'}
        </span>
      </div>

      {/* Players section */}
      <div className="p-4 bg-gray-50">
        <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">Spelers</p>
        <div className="space-y-2">
          {PLAYERS.map((player) => {
            const status = match.availability[player] ?? null
            return (
              <div key={player} className="flex items-center justify-between py-1">
                <span className="text-sm font-medium text-gray-700">{player}</span>
                <StatusPlaceholder status={status} />
              </div>
            )
          })}
        </div>

        {/* Availability counter */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm font-semibold" style={{ color: '#E87722' }}>
            {availableCount} van 6 beschikbaar
          </span>
        </div>
      </div>
    </div>
  )
}

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
    const matchAvailability = (availability ?? []).filter((a: { match_id: string }) => a.match_id === match.id)
    const availabilityMap: Partial<Record<PlayerName, AvailabilityStatus>> = {}
    matchAvailability.forEach((a: { player_name: string; status: string }) => {
      availabilityMap[a.player_name as PlayerName] = a.status as AvailabilityStatus
    })
    return { ...match, availability: availabilityMap }
  })

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1B3A5C' }} className="px-4 py-5 text-white relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10 max-w-lg mx-auto">
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">DE KEI 1</h1>
            <p className="text-sm font-medium" style={{ color: '#E87722' }}>Beschikbaarheid 2026</p>
          </div>
          <TennisBallSVG />
        </div>
      </header>

      {/* Match cards */}
      <main className="max-w-lg mx-auto px-3 py-4 pb-8">
        <div className="space-y-4">
          {matchesWithAvailability.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </main>
    </div>
  )
}
