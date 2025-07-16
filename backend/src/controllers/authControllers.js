import User from '../models/userModels.js'
import { matchedData } from 'express-validator'
import handleHttpError from '../utils/handleError.js'
import { encrypt } from '../utils/handlePassword.js'
import { tokenSign } from '../utils/handleJwt.js'
import { compare } from 'bcryptjs'

// NOTE: funzione per la registrazione di un utente
// Questa funzione gestisce la registrazione di un nuovo utente.
// Valida i dati ricevuti, cifra la password, salva l'utente nel database
// e restituisce un token JWT insieme ai dati utente (escludendo la password).
export const signUp = async (req, res) => {
  try {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const data = { ...req, password }

    console.log(data)

    const newUser = new User(data)

    const user = await newUser.save()
    user.set('password', undefined, { strict: false })

    const dataUser = {
      token: await tokenSign(user),
      user
    }

    res.status(200).json({
      status: 200,
      dataUser,
      message: 'Registrazione avvenuta con successo'
    })
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, 'Errore nella richiesta')
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
      handleHttpError(res, "Utente non trovato. Verifica l'indirizzo email o registrati per creare un account.", 404)
      return
    }

    const hashPassword = user.password
    const check = await compare(req.password, hashPassword)

    if (!check) {
      handleHttpError(res, 'Password errata. Controlla e riprova oppure utilizza la funzione di recupero password.', 401)
      return
    }

    user.set('password', undefined, { strict: false })

    res.status(200).json({
      status: 200,
      token: await tokenSign(user),
      user,
      message: 'Autenticazione completata con successo.'
    })
  } catch (error) {
    console.error(error.message)
    handleHttpError(res, "Si è verificato un errore interno del server. Riprova più tardi o contatta l'assistenza se il problema persiste.")
  }
}
