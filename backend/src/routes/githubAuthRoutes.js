/* eslint-disable indent */
import express from 'express'
import { githubAuthController } from '../controllers/githubController.js';
import handleHttpError from '../utils/handleHttpError.js'

const router = express.Router()

const {
    GITHUB_CLIENT_ID,
    GITHUB_CALLBACK_URL,
} = process.env

router.get('/', (req, res) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=read:user`
    return res.redirect(redirectUrl)
})

router.get('/callback', githubAuthController(handleHttpError));

export default router
