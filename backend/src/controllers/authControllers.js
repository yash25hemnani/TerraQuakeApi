import fs from 'fs'
import path, { dirname } from 'path'

import { fileURLToPath } from 'url'
import { UAParser } from 'ua-parser-js'
import User from '../models/userModels.js'
import { matchedData } from 'express-validator'
import handleHttpError from '../utils/handleHttpError.js'
import { encrypt, compare } from '../utils/handlePassword.js'
import { tokenSign } from '../utils/handleJwt.js'
import nodemailer from 'nodemailer'
import { sendEmailRegister } from '../libs/sendEmail.js'

// NOTE: funzione per la registrazione di un utente
// Questa funzione gestisce la registrazione di un nuovo utente.
// Valida i dati ricevuti, cifra la password, salva l'utente nel database
// e restituisce un token JWT insieme ai dati utente (escludendo la password).
export const signUp = async (req, res) => {
  try {
    const data = matchedData(req)

    const newUser = new User(data)
    const savedUser = await newUser.save()
    const user = savedUser.toObject()
    delete user.password

    await sendEmailRegister(user)

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: 'Registration successful',
        data: user,
        meta: {
          method: req.method,
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, 'User with this email already exists !', 409)
  }
}

// NOTE: funzione per il login di un utente
// Questa funzione consente a un utente registrato di effettuare il login.
// Verifica l'esistenza dell'email nel database, confronta la password fornita
// con quella salvata (cifrata), e se i dati sono validi restituisce un token JWT
// insieme alle informazioni dell'utente (escludendo la password).
export const signIn = async (req, res) => {
  try {
    req = matchedData(req)

    const user = await User.findOne({ email: req.email }).select('password name email role')

    if (!user) {
      handleHttpError(res, 'User not found. Please check the email address or register to create an account', 404)
      return
    }

    const hashPassword = user.password
    const check = await compare(req.password, hashPassword)

    if (!check) {
      handleHttpError(res, 'Incorrect password. Please check and try again, or use the password recovery feature', 401)
      return
    }

    user.set('password', undefined, { strict: false })

    res.status(200).json({
      success: true,
      code: 200,
      status: 'OK',
      message: 'Logged in successfully !',
      user,
      token: await tokenSign(user),
      meta: {
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, 'An internal server error occurred. Please try again later or contact support if the problem persists')
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

    res.status(200).json({
      success: true,
      code: 200,
      status: 'OK',
      message: 'Redirect',
      user,
      meta: {
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, null, 400)
  }
}

export const resetPassword = async (req, res) => {
  try {
    const data = matchedData(req)
    const { email, password: newUserPassword } = data

    const user = await User.findOne({ email })
    if (!user) {
      return handleHttpError(res, 'User not found', 404)
    }

    // confronto con la vecchia password
    const isSame = await compare(newUserPassword, user.password)
    if (isSame) {
      return handleHttpError(
        res,
        'New password cannot be the same as the old password!',
        409
      )
    }

    // genera la nuova password hashata con la funzione encrypt
    user.password = await encrypt(newUserPassword)
    await user.save()

    res.status(200).json({
      success: true,
      code: 200,
      status: 'Success',
      message: 'Password changed successfully!',
      meta: {
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error(error)
    handleHttpError(res, 'Error resetting password', 500)
  }
}
