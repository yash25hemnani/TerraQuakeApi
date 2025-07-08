import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Terremoti

// NOTE: lista dei terremoti più recenti
router.get('/earthquakes/recent')

// NOTE: terremoti avvenuti oggi
router.get('/earthquakes/today')

// NOTE: terremoti dell'ultima settimana
router.get('/earthquakes/last-week')

// NOTE: terremoti per mese specifico (es. marzo 2025)
router.get('/earthquakes/month/:year/:month')

// NOTE: cerca terremoti vicino a latitudine/longitudine specifica
router.get('/earthquakes/location/:latitude/:longitude')

// NOTE: lista terremoti per regione geografica (es. Calabria)
router.get('/earthquakes/region/:region')

// NOTE: filtra terremoti per profondità (es. > 100Km)
router.get('/earthquakes/depth/:depth')

// NOTE: filtra terremoti per un intervallo di tempo  starttime e endtime
router.get('/earthquakes/range/:starttime/:endtime')

// NOTE: filtra per magnitudo (es. da 4.0 a 6.0)
router.get('/earthquakes/magnitude/:min/:max')

// NOTE: dettagli di un terremoto specifico
router.get('/earthquakes/:id')

export default router
