import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorSignUp = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid username'),
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address'),
  check('role')
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage('Please enter a valid password'),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorSignIn = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address'),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage('Please enter a valid password'),
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
