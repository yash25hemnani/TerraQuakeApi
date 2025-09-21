import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorSignUp = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid username!'),

  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address!'),

  check('role').notEmpty(),

  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage('Password must be between 8 and 15 characters long!')
    .matches(/^[A-Z]/)
    .withMessage('Password must start with an uppercase letter!')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character!'),

  check('terms')
    .exists()
    .withMessage('Terms field is required')
    .custom((value) => {
      if (value !== true && value !== 'true' && value !== 1 && value !== 'on') {
        throw new Error('You must accept the Terms and Conditions!')
      }
      return true
    }),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorSignIn = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address!'),

  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage('Please enter a valid password!'),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorForgotPassword = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address!'),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorResetPassword = [
  check('password1')
    .exists()
    .withMessage('Password is required!')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters!')
    .matches(/[A-Z]/)
    .withMessage('Must contain an uppercase letter!')
    .matches(/\d/)
    .withMessage('Must contain a number!'),

  check('password2')
    .exists()
    .withMessage('Confirm password is required!')
    .custom((value, { req }) => value === req.body.password1)
    .withMessage('Passwords must match!'),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorChangePassword = [
  check('passwordOld')
    .exists()
    .withMessage('Current password is required!')
    .notEmpty()
    .withMessage('Current password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Current password must be at least 8 characters!')
    .matches(/[A-Z]/)
    .withMessage('Must contain an uppercase letter!')
    .matches(/\d/)
    .withMessage('Must contain a number!'),

  check('passwordNew')
    .exists()
    .withMessage('New password is required!')
    .notEmpty()
    .withMessage('New password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters!')
    .matches(/[A-Z]/)
    .withMessage('Must contain an uppercase letter!')
    .matches(/\d/)
    .withMessage('Must contain a number!'),

  check('confirmPassword')
    .exists()
    .withMessage('Confirm password is required!')
    .custom((value, { req }) => value === req.body.passwordNew)
    .withMessage('Passwords must match!'),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorGetItem = [
  check('userId').exists().notEmpty().isMongoId(),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorUpdateCurrentUserData = [
  check('name')
    .optional()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid username!'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email address!'),

  check('password')
    .optional()
    .isLength({ min: 8, max: 15 })
    .withMessage('Password must be between 8 and 15 characters long!')
    .matches(/^[A-Z]/)
    .withMessage('Password must start with an uppercase letter!')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character!'),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export const validatorUpdateRoleById = [
  check('role')
    .exists()
    .isIn(['admin', 'user', 'contributor'])
    .withMessage('Roles must be either admin or user!'),

  (req, res, next) => {
    return validateResults(req, res, next)
  }
]
