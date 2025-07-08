// NOTE: router per endpoint di test
// Questo modulo espone un singolo endpoint GET /test
// utilizzato per verificare che il server sia attivo e risponda correttamente.
import express from 'express'
import { getStart } from '../controllers/getStartControllers.js'

const router = express.Router()

// NOTE: endpoint test
router.get('/', getStart)

export default router
