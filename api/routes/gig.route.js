import express from "express"
import { createGig, deleteGig, getGig, getGigs, updateGig } from "../controllers/gig.controller.js"
import { verifyToken } from "../middlewares/jwt.js"

const router = express.Router()
router.post('/gigs', verifyToken, createGig)
router.delete("/gigs/:id", verifyToken, deleteGig)
router.get("/gigs/:id", verifyToken, getGig)
router.get("/gigs", verifyToken, getGigs)
router.put("/gigs/:id", verifyToken, updateGig)

export { router as gigRoute }