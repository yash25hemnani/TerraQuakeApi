import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Stazioni sismiche in Italia

// NOTE: elenco e dettagli delle stazioni sismiche attive
router.get('/')

// NOTE: restituisce una singola stazione sismica per codice
router.get('/:code')

// NOTE: restituisce tutte le stazioni sismiche in formato GeoJSON (per mappe)
router.get('/geojson')

// NOTE: elenca stazioni attive
router.get('/status/open')

// NOTE: elenca stazioni chiuse
router.get('/status/closed')

// NOTE: statistiche sulle stazioni sismiche (es. totali, attive, per rete)
router.get('/statistics')

export default router
