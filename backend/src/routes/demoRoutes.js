import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Esercitazione/Demo

// NOTE: simula un terremoto per test UI
router.get('/demo/fake-earthquake')

// NOTE: ritorna JSON di esempio per allenamento o esercizi
router.get('/demo/fake-data')

// NOTE: ritorna dati mock di statistiche
router.get('/demo/fake-statistics')

export default router
