// For INGV responses: apply sort/field selection/pagination to features[] arrays
export function processFeatures (features, query, opts = {}) {
  const {
    defaultSort = '-time',
    sortWhitelist = ['time', 'magnitude', 'depth'],
    fieldWhitelist // if undefined, all fields are allowed: sort by whatever is requested
  } = opts
  // 1) Sort (default: `-time` i.e. newest first if nothing specified in query string `sort=...`)
  const sortParam = query.sort || defaultSort
  const sortKeys = sortParam
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const safeSortKeys = sortKeys.filter((k) => {
    const key = k.replace(/^-/, '')
    return !sortWhitelist || sortWhitelist.includes(key)
  })
  const getValue = (f, key) => {
    //  map special keys to actual properties
    switch (key) {
      case 'time':
        return f.properties?.time // epoch ms
      case 'magnitude':
      case 'mag':
        return f.properties?.mag
      case 'depth':
        return f.geometry?.coordinates?.[2] // km
      default:
        return f.properties?.[key]
    }
  }
  const sorted = [...features].sort((a, b) => {
    for (const k of safeSortKeys) {
      const desc = k.startsWith('-')
      const key = desc ? k.slice(1) : k
      const av = getValue(a, key)
      const bv = getValue(b, key)
      if (av === bv) continue
      if (av == null) return 1
      if (bv == null) return -1
      return (av > bv ? 1 : -1) * (desc ? -1 : 1)
    }
    return 0
  })
  // 2) Field projection: `fields=time,magnitude,depth`
  let projected = sorted
  if (query.fields) {
    const requested = query.fields
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const safe = fieldWhitelist
      ? requested.filter((f) => fieldWhitelist.includes(f))
      : requested
    projected = sorted.map((f) => {
      const out = {}
      for (const field of safe) {
        switch (field) {
          case 'time':
            out.time = f.properties?.time
            break
          case 'magnitude':
            out.magnitude = f.properties?.mag
            break
          case 'depth':
            out.depth = f.geometry?.coordinates?.[2]
            break
          case 'place':
            out.place = f.properties?.place
            break
          case 'coordinates':
            out.coordinates = f.geometry?.coordinates
            break
          default:
            out[field] = f.properties?.[field]
            break
        }
      }
      return out
    })
  }
  // 3) Pagination
  const page = Math.max(parseInt(query.page ?? '1', 10), 1)
  const limitReq = Math.max(parseInt(query.limit ?? '50', 10), 1)
  const limit = Math.min(limitReq, 100) // hard cap
  const start = (page - 1) * limit
  const slice = projected.slice(start, start + limit)
  return {
    page,
    limit,
    items: slice,
    totalFetched: projected.length, // only within the fetched set
    hasMore: start + limit < projected.length // within this server-side fetch
  }
}
