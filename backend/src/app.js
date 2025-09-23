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
import rateLimiter from './middleware/rateLimiter.js'
// import routeStations from './routes/stationsRoutes.js'
// import routeGeospatial from './routes/geospatialRoutes.js'
// import routeStats from './routes/statisticsRoutes.js'
// import routeDemo from './routes/demoRoutes.js'

dotenv.config()

const devEnv = process.env.DEV_ENV || 'development'
const app = express()

// === MIDDLEWARE ===
app.use(helmet())
app.use(express.json())
app.use('/api', rateLimiter)

const port = process.env.PORT || 5000

const startServer = async () => {
  try {
    console.clear()
    await dbConnect()

    app.listen(port, () => {
      console.log(`Server running in ${devEnv} environment`)
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
