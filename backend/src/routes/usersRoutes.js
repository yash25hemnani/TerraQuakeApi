import express from 'express'
import {
  listAllUsers,
  updateRoleById,
  getCurrentUserData,
  updateCurrentUserData,
  deleteCurrentUser
} from '../controllers/userControllers.js'
import { validatorUpdateCurrentUserData } from '../validators/userValidators.js'

const router = express.Router()

// NOTE: USERS

// NOTE: lista completa utenti (solo admin)
router.get('/all', listAllUsers)

// NOTE: cambia ruolo di un utente (solo admin)
router.post('/:id/role', updateRoleById)

// NOTE: ottieni i dati utente loggato
router.get('/me', getCurrentUserData)

// NOTE: aggiorna dati utente loggato
router.put('/me/update', validatorUpdateCurrentUserData, updateCurrentUserData)

// NOTE: aggiorna preferenze (es. notifiche, area geografica)
router.delete('/preferences/:id')

// NOTE: cancella account utente
router.delete('/me/delete', deleteCurrentUser)

export default router
