// Fixed-window rate limiting per IP
// Window: 1 second, Limit: 100 requests

const WINDOW_MS = 1000
const LIMIT = 100

// In-memory store: { ip: { count: number, windowStart: number } }
const buckets = new Map()

const rateLimiter = (req, res, next) => {
  const now = Date.now()
  const ip = req.ip || req.connection?.remoteAddress || 'unknown'

  let bucket = buckets.get(ip)

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    bucket = { count: 0, windowStart: now }
    buckets.set(ip, bucket)
  }

  bucket.count += 1

  const resetInMs = WINDOW_MS - (now - bucket.windowStart)
  const resetAt = Math.ceil((now + Math.max(resetInMs, 0)) / 1000)
  const remaining = Math.max(LIMIT - bucket.count, 0)

  // Expose basic rate limit headers
  res.setHeader('X-RateLimit-Limit', String(LIMIT))
  res.setHeader('X-RateLimit-Remaining', String(remaining))
  res.setHeader('X-RateLimit-Reset', String(resetAt))

  if (bucket.count > LIMIT) {
    // Too Many Requests
    res.setHeader('Retry-After', String(Math.ceil(resetInMs / 1000)))
    return res.status(429).json({
      success: false,
      status: 429,
      message: 'Rate limit exceeded: max 100 requests per second. Please slow down, cache responses where possible, and retry after the reset window.',
      meta: {
        timestamp: new Date().toISOString()
      }
    })
  }

  next()
}

export default rateLimiter


