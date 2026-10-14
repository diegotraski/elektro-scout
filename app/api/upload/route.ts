import { createClient } from '@supabase/supabase-js'
import { timingSafeEqual } from 'crypto'

// Writes to the attacks table only happen here, on the server, with the service_role key.
// The browser keeps the public anon key, which (with the RLS policies in supabase/schema.sql)
// can only read. Uploads require the ADMIN_PASSWORD configured in Vercel.

const MAX_ROWS_PER_REQUEST = 1000

function isAuthorized(provided: string | null) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || !provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey || !process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Upload is not configured on the server.' }, { status: 500 })
  }
  if (!isAuthorized(request.headers.get('x-admin-password'))) {
    return Response.json({ error: 'Wrong admin password.' }, { status: 401 })
  }

  let body: { replace?: boolean; rows?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }
  const rows = Array.isArray(body.rows) ? body.rows : []
  if (rows.length > MAX_ROWS_PER_REQUEST) {
    return Response.json({ error: `Send at most ${MAX_ROWS_PER_REQUEST} rows per request.` }, { status: 413 })
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })

  // The first chunk of an upload replaces the whole table; later chunks only append.
  if (body.replace) {
    const { error } = await supabase.from('attacks').delete().gte('id', 0)
    if (error) return Response.json({ error: error.message }, { status: 500 })
  }
  if (rows.length > 0) {
    const { error } = await supabase.from('attacks').insert(rows)
    if (error) return Response.json({ error: error.message }, { status: 500 })
  }
  return Response.json({ inserted: rows.length })
}
