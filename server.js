import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// CONFIGURATION
const app = express()
dotenv.config()

// MONGOOSE SETUP
const URI = process.env.MONGODB_URI
mongoose.connect(URI)
    .then(() => { console.log('MongoDB connected') })
    .catch((err) => { console.log('Error: ', err) })


app.use('/', (req, res) => {
    res.send("pawpaw cui")
})


const PORT = process.env.PORT_SERVER
app.listen(PORT, () => {
    console.log(`Server connected to PORT: ${PORT}`)
})