import express from "express"
import { register, login } from "../controllers/auth.controller.js"

const router = express.Router()

router.get('/register', register)
router.get('/login', login)

export {router as authRoute}