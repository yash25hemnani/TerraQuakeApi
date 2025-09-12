// Validates & parses positive integers from req.query with optional caps/defaults
export function getPositiveInt (q, key, { min = 1, max, def } = {}) {
  const raw = q?.[key]
  if (raw === undefined || raw === null || raw === '') return def
  const n = Number(raw)
  if (!Number.isFinite(n) || n < min) return null
  if (max && n > max) return max
  return Math.floor(n)
};
