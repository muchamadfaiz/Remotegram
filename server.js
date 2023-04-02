import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { userRoute } from './api/routes/user.route.js'
import { authRoute } from './api/routes/auth.route.js'

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
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)


const PORT = process.env.PORT_SERVER
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`)
})