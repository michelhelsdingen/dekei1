'use client'
import { useState } from 'react'
import type { AvailabilityStatus } from '@/types'

interface StatusButtonsProps {
  matchId: string
  playerName: string
  currentStatus: AvailabilityStatus
  isOwn: boolean // true if this is the selected player's own row
}

const STATUS_CONFIG: Record<
  Exclude<AvailabilityStatus, null>,
  { label: string; icon: string; activeBg: string; activeBorder: string; readonlyBg: string; readonlyColor: string }
> = {
  ja: {
    label: 'Ja',
    icon: '✓',
    activeBg: '#16a34a',
    activeBorder: '#16a34a',
    readonlyBg: '#dcfce7',
    readonlyColor: '#16a34a',
  },
  nee: {
    label: 'Nee',
    icon: '✕',
    activeBg: '#dc2626',
    activeBorder: '#dc2626',
    readonlyBg: '#fee2e2',
    readonlyColor: '#dc2626',
  },
  reserve: {
    label: 'Res',
    icon: '⏱',
    activeBg: '#d97706',
    activeBorder: '#d97706',
    readonlyBg: '#fef3c7',
    readonlyColor: '#d97706',
  },
}

export function StatusButtons({ matchId, playerName, currentStatus, isOwn }: StatusButtonsProps) {
  const [optimisticStatus, setOptimisticStatus] = useState<AvailabilityStatus>(currentStatus)
  const [saving, setSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // Read-only view for other players
  if (!isOwn) {
    const status = optimisticStatus
    if (status === null) {
      return (
        <span className="text-xs text-gray-300 italic">—</span>
      )
    }
    const config = STATUS_CONFIG[status]
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ backgroundColor: config.readonlyBg, color: config.readonlyColor }}
      >
        {config.icon} {config.label}
      </span>
    )
  }

  const handleStatusClick = async (newStatus: Exclude<AvailabilityStatus, null>) => {
    if (saving) return
    setSaving(true)
    const previousStatus = optimisticStatus
    setOptimisticStatus(newStatus)
    setShowSuccess(false)
    setShowError(false)

    try {
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id: matchId, player_name: playerName, status: newStatus }),
      })
      if (!res.ok) throw new Error('Save failed')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 1000)
    } catch {
      setOptimisticStatus(previousStatus)
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex gap-1 items-center">
      {showSuccess && (
        <span className="text-xs text-green-600 mr-1">✓</span>
      )}
      {showError && (
        <span className="text-xs text-red-500 mr-1">!</span>
      )}
      {(Object.keys(STATUS_CONFIG) as Exclude<AvailabilityStatus, null>[]).map((statusKey) => {
        const config = STATUS_CONFIG[statusKey]
        const isActive = optimisticStatus === statusKey
        return (
          <button
            key={statusKey}
            onClick={() => handleStatusClick(statusKey)}
            disabled={saving}
            className="flex-shrink-0 px-2 py-1 rounded text-xs font-medium transition-transform active:scale-95"
            style={
              isActive
                ? {
                    backgroundColor: config.activeBg,
                    color: '#ffffff',
                    border: `1px solid ${config.activeBorder}`,
                  }
                : {
                    backgroundColor: '#ffffff',
                    color: saving ? '#9ca3af' : config.activeBg,
                    border: `1px solid ${saving ? '#e5e7eb' : config.activeBorder}`,
                  }
            }
          >
            {config.icon} {config.label}
          </button>
        )
      })}
    </div>
  )
}
