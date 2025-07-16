import express from 'express'
import { signIn, signUp } from '../controllers/authControllers.js'
import { validatorSignIn, validatorSignUp } from '../validators/userValidators.js'

const router = express.Router()

// NOTE: AUTH

// NOTE: registrazione utente
router.post('/signup', validatorSignUp, signUp)

// NOTE: login utente
router.post('/signin', validatorSignIn, signIn)

// NOTE: password dimenticata
router.post('/forgot-password')

// NOTE: reset password
router.post('/reset-password/:token')

// NOTE: cambia password
router.post('/change-password')

export default router
