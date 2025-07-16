import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorSignUp = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 }),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  check('role')
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorSignIn = [
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 }),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
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
