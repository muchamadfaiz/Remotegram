import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { verifyToken } from './api/middlewares/jwt.js'
import { userRoute } from './api/routes/user.route.js'
import { authRoute } from './api/routes/auth.route.js'
import { gigRoute } from "./api/routes/gig.route.js"

// CONFIGURATION
const app = express()
dotenv.config()

// MONGOOSE SETUP
const URI = process.env.MONGODB_URI
mongoose.connect(URI)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log('Error: ', err) })

// MIDLEWARES
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use('/api/users', verifyToken, userRoute)
app.use('/api/auth', authRoute)
app.use('/api/gigs', verifyToken, gigRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).send(errorMessage)
})

const PORT = process.env.PORT_SERVER
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`)
})