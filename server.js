import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
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

// ROUTES
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)


const PORT = process.env.PORT_SERVER
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`)
})