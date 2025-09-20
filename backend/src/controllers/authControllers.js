import fs from 'fs'
import path, { dirname } from 'path'

import { fileURLToPath } from 'url'
import { UAParser } from 'ua-parser-js'
import User from '../models/userModels.js'
import { matchedData } from 'express-validator'
import handleHttpError from '../utils/handleHttpError.js'
import nodemailer from 'nodemailer'
import { buildResponse } from '../utils/buildResponse.js'

/**
 * Controller: Register a new user.
 *
 * - Creates a new user document in the database.
 * - Returns the newly created user data without the password.
 * - Responds with `400 Bad Request` if validation fails or user already exists.
 * - Sends a mail to user on registration
 */
export const signUp = ({ User, buildResponse, handleHttpError, matchedData, sendEmailRegister }) => {
  return async (req, res) => {
    try {
      const data = matchedData(req)
      const newUser = new User(data)
      const savedUser = await newUser.save()
      const user = savedUser.toObject()
      delete user.password

      await sendEmailRegister(user)
      res.status(200).json(buildResponse(req, 'Registration successful', user, null, {}))
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'User with this email already exists !', 409)
    }
  }
}

/**
 * Controller: Authenticate user (sign in).
 *
 * - Looks up the user by email in the database.
 * - Responds with `404 Not Found` if no user exists with the given email.
 * - Compares the provided password with the stored hashed password.
 * - Responds with `401 Unauthorized` if the password is incorrect.
 * - Removes password field from the user object before returning.
 * - Generates a signed authentication token and includes it in the response.
 * - Responds with `200 OK` and user data + token on successful login.
 * - Responds with `500 Internal Server Error` if an unexpected error occurs.
 */
export const signIn = ({ User, buildResponse, handleHttpError, tokenSign, matchedData, compare }) => {
  return async (req, res) => {
    try {
      req.body = matchedData(req)

      const user = await User.findOne({ email: req.body.email }).select('password name email role').lean()
      if (!user) {
        handleHttpError(res, 'User not found. Please check the email address or register to create an account', 404)
        return
      }

      const check = await compare(req.body.password, user.password)
      if (!check) {
        handleHttpError(res, 'Incorrect password. Please check and try again, or use the password recovery feature', 401)
        return
      }
      delete user.password

      res.status(200).json(buildResponse(req, 'Logged in successfully!', user, null, {
        token: await tokenSign(user)
      }))
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'An internal server error occurred. Please try again later or contact support if the problem persists')
    }
  }
}

// NOTE: Funzione per il recupero della password
export const forgotPassword = async (req, res) => {
  try {
    const validatedData = matchedData(req)
    const user = await User.findOne({ email: validatedData.email })
    const userAgent = req.header('User-Agent')
    const parser = new UAParser(userAgent)

    // Create a test account or replace with real credentials. (replace it with actual email in production)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lonnie.mante78@ethereal.email',
        pass: 'pvjJDsQyt34Yf5aasx'
      }
    })

    // Emulate __dirname
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    // TODO: CHANGE 'Action URL' to replace the entire URL of password reset when email is set up.
    // TODO: Update references to support url and other variables in password reset html form as well as text form
    // Read the HTML file content
    const htmlPath = path.join(__dirname, '../config/PasswordResetEmailFormat.html')
    let htmlContent = await fs.promises.readFile(htmlPath, 'utf-8')
    htmlContent = htmlContent
      .replace('{{username}}', validatedData.email)
      .replace('{{operating_system}}', parser.getResult().os.name)
      .replace('{{browser_name}}', parser.getResult().browser.name)
      .replace('{{action_url}}', req.originalUrl)
      .replace('{{support_url}}', 'support@terraquake.com')
      .replace('{{full_url}}', `${req.protocol}://${req.get('host')}${req.originalUrl}`);

    // Wrap in an async IIFE so we can use await.
    (async () => {
      const info = await transporter.sendMail({
        from: '"TerraQuake Support" <support@terraquake.com>',
        to: `${req.body.email}`,
        subject: 'Password Change Request',
        html: htmlContent // HTML body
      })

      console.log('Message sent:', info.messageId)
      console.log(nodemailer.getTestMessageUrl(info))
    })()

    res.status(200).json(buildResponse(req, 'Redirect', user))
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, null, 400)
  }
}

/**
 * Controller: Reset user password.
 *
 * - Looks up the user by email in the database.
 * - Responds with `404 Not Found` if the user does not exist.
 * - Compares the new password with the existing one.
 * - Responds with `409 Conflict` if the new password is the same as the old password.
 * - Updates the user's password and saves the record.
 * - Removes the password field before returning the updated user object.
 * - Responds with `200 OK` and success message on successful update.
 * - Responds with `500 Internal Server Error` if an unexpected error occurs.
 */
export const resetPassword = ({ User, handleHttpError, buildResponse, matchedData, compare }) => {
  return async (req, res) => {
    try {
      const data = matchedData(req)
      const { email, password: newUserPassword } = data

      const user = await User.findOne({ email }).select('+password')
      if (!user) {
        return handleHttpError(res, 'User not found', 404)
      }

      const isSame = await compare(newUserPassword, user.password)
      if (isSame) {
        return handleHttpError(
          res,
          'New password cannot be the same as the old password!',
          409
        )
      }

      user.password = newUserPassword
      const savedUser = await user.save()
      const userResponseObject = savedUser.toObject()
      delete userResponseObject.password

      res.status(200).json(buildResponse(req, 'Password changed successfully!', userResponseObject, null, {}))
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'Error resetting password', 500)
    }
  }
}
