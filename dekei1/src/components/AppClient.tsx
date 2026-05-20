'use client'
import { useState, useCallback, useMemo } from 'react'
import type { MatchWithAvailability, PlayerName, AvailabilityStatus, Season } from '@/types'
import { SEASON_META } from '@/types'
import { PlayerSelector } from './PlayerSelector'
import { MatchCard } from './MatchCard'

interface AppClientProps {
  initialMatches: MatchWithAvailability[]
  availableSeasons: Season[]
  defaultSeason: Season
}

export function AppClient({ initialMatches, availableSeasons, defaultSeason }: AppClientProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerName | null>(null)
  const [matches, setMatches] = useState(initialMatches)
  const [season, setSeason] = useState<Season>(defaultSeason)

  const handleStatusChange = useCallback(
    (matchId: string | number, player: PlayerName, status: AvailabilityStatus) => {
      setMatches(prev =>
        prev.map(m =>
          m.id === matchId
            ? { ...m, availability: { ...m.availability, [player]: status } }
            : m
        )
      )
    },
    []
  )

  const visibleMatches = useMemo(
    () => matches.filter(m => m.season === season),
    [matches, season]
  )

  const subtitle = SEASON_META[season].subtitle
  const showSwitcher = availableSeasons.length > 1

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1B3A5C' }} className="px-4 py-5 text-white relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10 max-w-lg mx-auto">
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">DE KEI 1</h1>
            <p className="text-sm font-medium" style={{ color: '#E87722' }}>{subtitle}</p>
          </div>
          {/* Tennis ball decoration */}
          <svg width="48" height="48" viewBox="0 0 48 48" className="opacity-20" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="3" />
            <path d="M4 24 Q14 14 24 24 Q34 34 44 24" fill="none" stroke="white" strokeWidth="2" />
            <path d="M4 24 Q14 34 24 24 Q34 14 44 24" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </header>

      {/* Season switcher */}
      {showSwitcher && (
        <div className="max-w-lg mx-auto px-3 pt-3">
          <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
            {availableSeasons.map(s => {
              const active = s === season
              const meta = SEASON_META[s]
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: active ? '#1B3A5C' : 'transparent',
                    color: active ? 'white' : '#1B3A5C',
                  }}
                >
                  {s === 'zomer-2026' && <SunIcon active={active} />}
                  {meta.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Player selector */}
      <PlayerSelector selectedPlayer={selectedPlayer} onPlayerSelect={setSelectedPlayer} />

      {/* Match cards */}
      <main className="max-w-lg mx-auto px-3 py-4 pb-8">
        {!selectedPlayer && (
          <p className="text-center text-sm text-gray-500 mb-4 py-2 px-4 bg-white rounded-lg border border-dashed border-gray-300">
            Kies je naam hierboven om je beschikbaarheid in te vullen
          </p>
        )}
        <div className="space-y-4">
          {visibleMatches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              selectedPlayer={selectedPlayer}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function SunIcon({ active }: { active: boolean }) {
  const color = active ? '#FFD23F' : '#E87722'
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill={color} />
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="2"  x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2"  y1="12" x2="5"  y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.5"  y1="4.5"  x2="6.5"  y2="6.5" />
        <line x1="17.5" y1="17.5" x2="19.5" y2="19.5" />
        <line x1="4.5"  y1="19.5" x2="6.5"  y2="17.5" />
        <line x1="17.5" y1="6.5"  x2="19.5" y2="4.5" />
      </g>
    </svg>
  )
}
