import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: matches, error } = await supabase
    .from('dekei1_matches')
    .select('*')
    .order('round', { ascending: true })

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Database Error</h1>
        <pre className="mt-4 text-sm bg-red-50 p-4 rounded overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">DE KEI 1 — Foundation Check</h1>
      <p className="text-green-600 font-semibold mb-6">✓ Database verbinding werkt!</p>
      <ul className="space-y-3">
        {matches?.map((match) => (
          <li key={match.id} className="border border-gray-200 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-gray-900">Ronde {match.round}</strong>
                <span className="text-gray-600 ml-2">— {match.opponent}</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded font-medium ${
                match.home_away === 'home'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {match.home_away === 'home' ? 'Thuis' : 'Uit'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {match.match_date} om {match.match_time}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-gray-400">
        {matches?.length ?? 0} wedstrijden geladen uit Supabase
      </p>
    </div>
  )
}
