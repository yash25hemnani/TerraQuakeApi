import express from 'express'
import { getStart } from '../controllers/getStartControllers.js'

const router = express.Router()

router.get('/', getStart)

export default router
