import express from 'express'
import { lastWeek, recent, today } from '../controllers/earthquakesControllers.js'

const router = express.Router()

// NOTE: CATEGORIA -> Terremoti

// NOTE: lista completa eventi sismici più recenti
router.get('/recent', recent)

// NOTE: lista completa eventi sismici della data odierna
router.get('/today', today)

// NOTE: lista completa eventi sismici dell'ultima settimana
router.get('/last-week', lastWeek)

// NOTE: lista completa eventi sismici per mese specifico (es. marzo 2025)
router.get('/month/:year/:month')

// NOTE: cerca eventi sismici vicino a latitudine/longitudine specifica
router.get('/location/:latitude/:longitude')

// NOTE: lista completa eventi sismici per regione geografica (es. Calabria)
router.get('/region/:region')

// NOTE: filtra eventi sismici per profondità (es. > 100Km)
router.get('/depth/:depth')

// NOTE: filtra eventi sismici per un intervallo di tempo  starttime e endtime
router.get('/range/:starttime/:endtime')

// NOTE: filtra eventi sismici per magnitudo (es. da 4.0 a 6.0)
router.get('/magnitude/:min/:max')

// NOTE: dettagli di un singolo evento sismico specifico
router.get('/:id')

export default router
