'use client'
import { useState, useEffect } from 'react'
import { PLAYERS } from '@/types'
import type { PlayerName } from '@/types'

interface PlayerSelectorProps {
  onPlayerSelect: (player: PlayerName | null) => void
  selectedPlayer: PlayerName | null
}

export function PlayerSelector({ onPlayerSelect, selectedPlayer }: PlayerSelectorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Restore from localStorage on mount
    const saved = localStorage.getItem('dekei1_player') as PlayerName | null
    if (saved && PLAYERS.includes(saved)) {
      onPlayerSelect(saved)
    }
  }, [onPlayerSelect])

  const handleClick = (player: PlayerName) => {
    if (player === selectedPlayer) {
      // Toggle off
      localStorage.removeItem('dekei1_player')
      onPlayerSelect(null)
    } else {
      localStorage.setItem('dekei1_player', player)
      onPlayerSelect(player)
    }
  }

  if (!mounted) {
    // SSR-safe: render placeholder to avoid hydration mismatch
    return (
      <div className="sticky top-0 z-10 bg-white shadow-sm px-3 py-3 border-b border-gray-100">
        <p className="text-xs text-gray-400 mb-2">Ik ben:</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PLAYERS.map((player) => (
            <div
              key={player}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-400 bg-gray-50"
            >
              {player}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm px-3 py-3 border-b border-gray-100">
      <p className="text-xs text-gray-400 mb-2">Ik ben:</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {PLAYERS.map((player) => {
          const isActive = player === selectedPlayer
          return (
            <button
              key={player}
              onClick={() => handleClick(player)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={
                isActive
                  ? { backgroundColor: '#1B3A5C', color: '#ffffff', border: '1px solid #1B3A5C' }
                  : { backgroundColor: '#ffffff', color: '#1B3A5C', border: '1px solid #1B3A5C' }
              }
            >
              {isActive ? `✓ ${player}` : player}
            </button>
          )
        })}
      </div>
    </div>
  )
}
