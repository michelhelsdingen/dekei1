import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client geconfigureerd voor de dekei1 app
// Tabellen in public schema met dekei1_ prefix (PostgREST exposes public schema only)
// Gebruik: supabase.from('dekei1_matches'), supabase.from('dekei1_availability')
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
