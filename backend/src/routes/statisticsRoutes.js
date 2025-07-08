import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Statistiche

// NOTE: statistiche globali (totali, medie, picco)
router.get('/stats/global')

// NOTE: statistiche sismiche per regioni
router.get('/stats/region/:region')

// NOTE: statistiche sismiche per anno
router.get('/stats/yearly/:year')

// NOTE: dati per creare una heatmap (coordinate + magnitudo)
router.get('/stats/heatmap')

export default router
