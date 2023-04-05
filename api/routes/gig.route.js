import express from "express"
import { createGig } from "../controllers/gig.controller.js"

const router = express.Router()
router.post("/create", createGig)

export { router as gigRoute }