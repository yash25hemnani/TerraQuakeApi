import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import expressListEndpoints from 'express-list-endpoints'

import routeAuth from './routes/authRoutes.js'
import routeUsers from './routes/usersRoutes.js'
import routeGetStart from './routes/testRoutes.js'
import routeEarthquakes from './routes/earthquakesRoutes.js'
import dbConnect from './config/mongoConfig.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import rateLimiter from './middleware/rateLimiter.js'
// import routeStations from './routes/stationsRoutes.js'
// import routeGeospatial from './routes/geospatialRoutes.js'
// import routeStats from './routes/statisticsRoutes.js'
// import routeDemo from './routes/demoRoutes.js'

dotenv.config()

const devEnv = process.env.DEV_ENV
const app = express()

const whitelist = [
  process.env.FRONTEND_DEVELOPMENT, // Frontend in sviluppo
  process.env.BACKEND_URL // Backend in produzione
]

/*
    * CORS configuration
    * Allow all requests from the frontend or
    * development environment
*/
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.DEV_ENV === 'development') {
      callback(null, true)
    } else if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('PERMESSO NEGATO - CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use('/api', rateLimiter)

const port = process.env.PORT || 5000

app.use('/api/test', routeGetStart)
app.use('/api/auth', routeAuth)
app.use('/api/users', authenticateUser, routeUsers)
app.use('/api/earthquakes', routeEarthquakes)
// app.use('/api/station', routeStations)
// app.use('/api/geospatial', routeGeospatial)
// app.use('/api/statistics', routeStats)
// app.use('/api/', routeDemo)

const startServer = async () => {
  try {
    console.clear()
    await dbConnect()

    app.listen(port, () => {
      console.log(`Server running in ${devEnv || 'production'} environment`)
      console.log(`Started at: http://localhost:${port}`)
      console.log(`Test: http://localhost:${port}/api/test`)
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
