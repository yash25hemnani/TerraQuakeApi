import express from 'express'
import {
  getEarthquakesByMonth,
  getEarthquakesByRegion,
  getEarthquakesByDateRange,
  getEarthquakesByDepth,
  getEarthquakesByLastWeek,
  getEarthquakesByMagnitude,
  getEarthquakesByRecent,
  getEarthquakesByToday,
  getEarthquakesById
} from '../controllers/earthquakesControllers.js'

const router = express.Router()

// NOTE: CATEGORIA -> Terremoti

// NOTE: lista completa eventi sismici più recenti
router.get('/recent', getEarthquakesByRecent)

// NOTE: lista completa eventi sismici della data odierna
router.get('/today', getEarthquakesByToday)

// NOTE: lista completa eventi sismici dell'ultima settimana
router.get('/last-week', getEarthquakesByLastWeek)

// NOTE: lista completa eventi sismici per mese specifico (es. marzo 2025)
router.get('/month', getEarthquakesByMonth)

// NOTE: cerca eventi sismici vicino a latitudine/longitudine specifica
router.get('/location')

// NOTE: lista completa eventi sismici per regione geografica (es. Calabria)
router.get('/region', getEarthquakesByRegion)

// NOTE: filtra eventi sismici per profondità (es. > 100Km)
router.get('/depth', getEarthquakesByDepth)

// NOTE: filtra eventi sismici per un intervallo di tempo startdate e enddate
router.get('/range-time', getEarthquakesByDateRange)

// NOTE: filtra eventi sismici per magnitudo (es. 4.0)
router.get('/magnitude', getEarthquakesByMagnitude)

// NOTE: dettagli di un singolo evento sismico specifico
router.get('/eventId', getEarthquakesById)

export default router
