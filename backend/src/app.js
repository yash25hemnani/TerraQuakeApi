import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import expressListEndpoints from 'express-list-endpoints'

import routeAuth from './routes/authRoutes.js'
// import routeUsers from './routes/usersRoutes.js'
import routeGetStart from './routes/testRoutes.js'
import routeEarthquakes from './routes/earthquakesRoutes.js'
import dbConnect from './config/mongoConfig.js'
// import routeStations from './routes/stationsRoutes.js'
// import routeGeospatial from './routes/geospatialRoutes.js'
// import routeStats from './routes/statisticsRoutes.js'
// import routeDemo from './routes/demoRoutes.js'

dotenv.config()

const devEnv = process.env.DEV_ENV
const app = express()

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      process.env.FRONTEND_DEVELOPMENT, // Frontend in sviluppo
      // Frontend in produzione
      process.env.BACKEND_URL // Backend in produzione
    ]
    if (process.env.NODE_ENV === 'development') {
      callback(null, true)
    } else if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('PERMESSO NEGATO - CORS'))
    }
  },
  credentials: true // Permette l'invio di credenziali, come nel caso di autenticazione
}

// Abilita CORS
app.use(cors(corsOptions))

app.use(express.json())

const port = process.env.PORT || 5000

app.use('/api/test', routeGetStart)
app.use('/auth', routeAuth)
// app.use('/users', routeUsers)
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
