import express from 'express'
import { getSubmissions } from "../controllers/submissionControllers.ts"

const router = express.Router()

router.get('/', getSubmissions)

export default router