import express from 'express'
import {
  getEarthquakesByMonth,
  getEarthquakesByRegion,
  getEarthquakesByTimeRange,
  getEarthquakesDepth,
  getEarthquakesLastWeek,
  getEarthquakesRecent,
  getEarthquakesToday
} from '../controllers/earthquakesControllers.js'

const router = express.Router()

// NOTE: CATEGORIA -> Terremoti

// NOTE: lista completa eventi sismici più recenti
router.get('/recent', getEarthquakesRecent)

// NOTE: lista completa eventi sismici della data odierna
router.get('/today', getEarthquakesToday)

// NOTE: lista completa eventi sismici dell'ultima settimana
router.get('/last-week', getEarthquakesLastWeek)

// NOTE: lista completa eventi sismici per mese specifico (es. marzo 2025)
router.get('/month', getEarthquakesByMonth)

// NOTE: cerca eventi sismici vicino a latitudine/longitudine specifica
router.get('/location')

// NOTE: lista completa eventi sismici per regione geografica (es. Calabria)
router.get('/region', getEarthquakesByRegion)

// NOTE: filtra eventi sismici per profondità (es. > 100Km)
router.get('/depth', getEarthquakesDepth)

// NOTE: filtra eventi sismici per un intervallo di tempo starttime e endtime
router.get('/range-time', getEarthquakesByTimeRange)

// NOTE: filtra eventi sismici per magnitudo (es. da 4.0 a 6.0)
router.get('/magnitude')

// NOTE: dettagli di un singolo evento sismico specifico
router.get('/:id')

export default router
