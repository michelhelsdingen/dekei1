'use client'
import type { MatchWithAvailability, PlayerName, AvailabilityStatus } from '@/types'
import { PLAYERS } from '@/types'
import { StatusButtons } from './StatusButtons'

interface MatchCardProps {
  match: MatchWithAvailability
  selectedPlayer: PlayerName | null
  onStatusChange: (matchId: string | number, player: PlayerName, status: AvailabilityStatus) => void
}

export function MatchCard({ match, selectedPlayer, onStatusChange }: MatchCardProps) {
  const availableCount = Object.values(match.availability).filter(s => s === 'ja').length
  const teamComplete = availableCount >= 4

  return (
    <div
      className="rounded-xl shadow-sm overflow-hidden"
      style={teamComplete ? { backgroundColor: '#ffffff', border: '2px solid #16a34a', boxShadow: '0 0 0 1px #bbf7d0' } : { backgroundColor: '#ffffff' }}
    >
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
            const isOwn = player === selectedPlayer
            return (
              <div
                key={player}
                className="flex items-center justify-between py-1.5 px-2 rounded-lg"
                style={isOwn ? { backgroundColor: '#eff6ff' } : {}}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: isOwn ? '#1B3A5C' : '#374151' }}
                >
                  {player}
                  {isOwn && <span className="ml-1 text-xs text-blue-400">(jij)</span>}
                </span>
                <StatusButtons
                  matchId={match.id}
                  playerName={player}
                  currentStatus={status}
                  isOwn={isOwn}
                  onStatusChange={(newStatus) => onStatusChange(match.id, player, newStatus)}
                />
              </div>
            )
          })}
        </div>

        {/* Availability counter */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm font-semibold" style={{ color: teamComplete ? '#16a34a' : '#E87722' }}>
            {teamComplete ? '✓ ' : ''}{availableCount} van 6 beschikbaar
          </span>
        </div>
      </div>
    </div>
  )
}
