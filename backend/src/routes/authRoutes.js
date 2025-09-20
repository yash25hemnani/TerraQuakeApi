import express from 'express'
import { signIn, signUp, forgotPassword, resetPassword } from '../controllers/authControllers.js'
import { validatorSignIn, validatorSignUp, validatorForgotPassword, validatorResetPassword } from '../validators/userValidators.js'

import User from '../models/userModels.js'
import { matchedData } from 'express-validator'
import { tokenSign } from '../utils/handleJwt.js'
import { compare } from '../utils/handlePassword.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { sendEmailRegister } from '../libs/sendEmail.js'
const router = express.Router()

// NOTE: AUTH

// NOTE: registrazione utente
router.post('/signup', validatorSignUp, signUp({ User, buildResponse, handleHttpError, matchedData, sendEmailRegister }))

// NOTE: login utente
router.post('/signin', validatorSignIn, signIn({ User, buildResponse, handleHttpError, tokenSign, matchedData, compare }))

// NOTE: password dimenticata
router.post('/forgot-password', validatorForgotPassword, forgotPassword)

// NOTE: reset password
router.post('/reset-password/:token')

// NOTE: cambia password
router.post('/reset-password', validatorResetPassword, resetPassword({ User, handleHttpError, buildResponse, matchedData, compare }))

export default router
