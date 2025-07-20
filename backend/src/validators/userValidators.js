import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorSignUp = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Inserisci un nome utente non valido'),
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Inserisci una email valida'),
  check('role')
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage('Inserisci una password valida'),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorSignIn = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Inserisci un indirizzo email valido'),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage('Inserisci una password valida'),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorGetItem = [
  check('userId')
    .exists()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]
