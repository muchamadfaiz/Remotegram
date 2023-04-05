import express from "express"
import { deleteUser } from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/jwt.js"

const router = express.Router()

router.delete('/users/:id', verifyToken, deleteUser)

export {router as userRoute}