import express from 'express'
import { getQuestion } from "../controllers/questionControllers.ts"

const router = express.Router()

router.get('/:id', getQuestion)

export default router