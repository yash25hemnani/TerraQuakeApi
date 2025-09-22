import rateLimit from 'express-rate-limit'

// NOTE: Generic configuration for APIs
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: { message: 'Too many requests, please try again later.' }
})

// NOTE: Dedicated configuration only for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // stricter limit for login to prevent brute force
  message: { message: 'Too many login attempts, please try again later.' }
})
