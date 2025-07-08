import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Esercitazione/Demo

// NOTE: simula un terremoto per test UI
router.get('/fake-earthquake')

// NOTE: ritorna JSON di esempio per allenamento o esercizi
router.get('/fake-data')

// NOTE: ritorna dati mock di statistiche
router.get('/fake-statistics')

export default router
