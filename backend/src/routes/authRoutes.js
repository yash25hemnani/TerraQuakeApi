import express from 'express'

const router = express.Router()

// NOTE: AUTH

// NOTE: registrazione utente
router.post('/signup')

// NOTE: login utente
router.post('/signin')

// NOTE: password dimenticata
router.post('/forgot-password')

// NOTE: reset password
router.post('/reset-password/:token')

// NOTE: cambia password
router.post('/change-password')

export default router
