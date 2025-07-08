import express from 'express'

const router = express.Router()

// NOTE: USERS

// NOTE: lista completa utenti (solo admin)
router.get('/all')

// NOTE: cambia ruolo di un utente (solo admin)
router.get('/:id/role')

// NOTE: ottieni i dati utente loggato
router.get('/me')

// NOTE: aggiorna dati utente loggato
router.put('/me/:id/update')

// NOTE: aggiorna preferenze (es. notifiche, area geografica)
router.delete('/preferences/:id')

// NOTE: cancella account utente
router.delete('/me/:id/delete')

export default router
