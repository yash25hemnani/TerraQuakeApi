import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import expressListEndpoints from 'express-list-endpoints'

import routeAuth from './routes/authRoutes.js'
import routeUsers from './routes/usersRoutes.js'
import routeContact from './routes/contactRoutes.js'
import routeGetStart from './routes/testRoutes.js'
import routeEarthquakes from './routes/earthquakesRoutes.js'
import dbConnect from './config/mongoConfig.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const devEnv = process.env.DEV_ENV
const app = express()

// === CORS configuration ===
// Allow requests from any origin in development or Postman
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || devEnv === 'development') {
      // Server-side requests or fetch from browser in development
      callback(null, true)
    } else if (origin === process.env.FRONTEND_PRODUCTION) {
      // Requests from the production domain
      callback(null, true)
    } else {
      callback(new Error('CORS: Access denied'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())

const port = process.env.PORT || 5000

// ===== ROUTES =====
app.use('/v1/test', apiLimiter, routeGetStart)
app.use('/auth', authLimiter, routeAuth)
app.use('/users', authLimiter, authenticateUser, routeUsers)
app.use('/contact', routeContact)
app.use('/v1/earthquakes', apiLimiter, routeEarthquakes)
// app.use('/v1/station', apiLimiter, routeStations);
// app.use('/v1/geospatial', apiLimiter, routeGeospatial);
// app.use('/v1/statistics', apiLimiter, routeStats);
// app.use('/v1/demo', apiLimiter, routeDemo);

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

// ===== START SERVER =====
const startServer = async () => {
  try {
    console.clear()
    await dbConnect()

    app.listen(port, () => {
      console.log(`Server running in ${devEnv || 'production'} environment`)
      console.log(`Started at: http://localhost:${port}`)
      console.log(`Test endpoint: http://localhost:${port}/v1/test`)

      const endPoints = expressListEndpoints(app)
      console.log('List of available endpoints:')
      console.table(endPoints)
    })
  } catch (error) {
    console.log('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()
