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

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/auth', routeAuth)
// app.use('/users', routeUsers)
app.use('/api/test', routeGetStart)
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
      console.log(`Server in ambiente ${devEnv || 'production'}`)
      console.log(`Avviato su: http://localhost:${port}`)
      console.log(`Test: http://localhost:${port}/api/test`)
      const endPoints = expressListEndpoints(app)
      console.log('Elenco endpoint disponibili:')
      console.table(endPoints)
    })
  } catch (error) {
    console.log('Errore avvio server:', error.message)
    process.exit(1)
  }
}

startServer()
