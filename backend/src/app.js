import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import expressListEndpoints from 'express-list-endpoints'

import routeGetStart from './routes/testRoutes.js'

dotenv.config()

const devEnv = process.env.DEV_ENV
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/api', routeGetStart)

const startServer = async () => {
  try {
    console.clear()
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
