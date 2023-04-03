import express from "express"
import { deleteUser } from "../controllers/user.controller.js"

const router = express.Router()

router.delete('/delete/:id', deleteUser)

export {router as userRoute}