'use client'
import { useState, useCallback } from 'react'
import type { MatchWithAvailability, PlayerName, AvailabilityStatus } from '@/types'
import { PlayerSelector } from './PlayerSelector'
import { MatchCard } from './MatchCard'

interface AppClientProps {
  initialMatches: MatchWithAvailability[]
}

export function AppClient({ initialMatches }: AppClientProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerName | null>(null)
  const [matches, setMatches] = useState(initialMatches)

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

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1B3A5C' }} className="px-4 py-5 text-white relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10 max-w-lg mx-auto">
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight">DE KEI 1</h1>
            <p className="text-sm font-medium" style={{ color: '#E87722' }}>Beschikbaarheid 2026</p>
          </div>
          {/* Tennis ball decoration */}
          <svg width="48" height="48" viewBox="0 0 48 48" className="opacity-20" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="3" />
            <path d="M4 24 Q14 14 24 24 Q34 34 44 24" fill="none" stroke="white" strokeWidth="2" />
            <path d="M4 24 Q14 34 24 24 Q34 14 44 24" fill="none" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </header>

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
          {matches.map(match => (
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
