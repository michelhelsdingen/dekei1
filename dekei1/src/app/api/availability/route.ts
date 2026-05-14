import { NextResponse } from 'next/server'
import type { PlayerName, AvailabilityStatus } from '@/types'
import { getDB } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { match_id, player_name, status } = body as {
    match_id: number | string
    player_name: PlayerName
    status: AvailabilityStatus
  }

  if (!match_id || !player_name || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const validPlayers: PlayerName[] = ['Mark', 'Coen', 'Bas', 'Maarten', 'Niels', 'Michel']
  const validStatuses: AvailabilityStatus[] = ['ja', 'nee', 'reserve']

  if (!validPlayers.includes(player_name) || !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid player or status' }, { status: 400 })
  }

  const matchIdNum = typeof match_id === 'string' ? parseInt(match_id, 10) : match_id
  const nowIso = new Date().toISOString()

  const db = await getDB()
  try {
    await db
      .prepare(
        `INSERT INTO dekei1_availability (match_id, player_name, status, updated_at)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(match_id, player_name) DO UPDATE SET
           status = excluded.status,
           updated_at = excluded.updated_at`
      )
      .bind(matchIdNum, player_name, status, nowIso)
      .run()
    return NextResponse.json({ success: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('D1 upsert error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
