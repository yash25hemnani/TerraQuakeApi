import express from 'express'
import { recent } from '../controllers/earthquakesControllers.js'

const router = express.Router()

// NOTE: CATEGORIA -> Terremoti

// NOTE: lista dei terremoti più recenti
router.get('/recent', recent)

// NOTE: terremoti avvenuti oggi
router.get('/today')

// NOTE: terremoti dell'ultima settimana
router.get('/last-week')

// NOTE: terremoti per mese specifico (es. marzo 2025)
router.get('/month/:year/:month')

// NOTE: cerca terremoti vicino a latitudine/longitudine specifica
router.get('/location/:latitude/:longitude')

// NOTE: lista terremoti per regione geografica (es. Calabria)
router.get('/region/:region')

// NOTE: filtra terremoti per profondità (es. > 100Km)
router.get('/depth/:depth')

// NOTE: filtra terremoti per un intervallo di tempo  starttime e endtime
router.get('/range/:starttime/:endtime')

// NOTE: filtra per magnitudo (es. da 4.0 a 6.0)
router.get('/magnitude/:min/:max')

// NOTE: dettagli di un terremoto specifico
router.get('/:id')

export default router
