import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Stazioni sismiche in Italia

// NOTE: elenco e dettagli delle stazioni sismiche attive
router.get('/station')

// NOTE: restituisce una singola stazione sismica per codice
router.get('/station/:code')

// NOTE: restituisce tutte le stazioni sismiche in formato GeoJSON (per mappe)
router.get('/station/geojson')

// NOTE: elenca stazioni attive
router.get('/station/status/open')

// NOTE: elenca stazioni chiuse
router.get('/station/status/closed')

// NOTE: statistiche sulle stazioni sismiche (es. totali, attive, per rete)
router.get('/station/statistics')

export default router
