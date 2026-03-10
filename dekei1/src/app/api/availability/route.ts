import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { PlayerName, AvailabilityStatus } from '@/types'

// Use service role key for API route to ensure write permissions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const body = await request.json()
  const { match_id, player_name, status } = body as {
    match_id: string
    player_name: PlayerName
    status: AvailabilityStatus
  }

  // Validation
  if (!match_id || !player_name || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const validPlayers: PlayerName[] = ['Mark', 'Coen', 'Bas', 'Maarten', 'Niels', 'Michel']
  const validStatuses: AvailabilityStatus[] = ['ja', 'nee', 'reserve']

  if (!validPlayers.includes(player_name) || !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid player or status' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('dekei1_availability')
    .upsert(
      {
        match_id,
        player_name,
        status,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'match_id,player_name' }
    )
    .select()
    .single()

  if (error) {
    console.error('Supabase upsert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
