import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT_SERVER } from './api/config/config.js'
import { errorHandler } from './api/middlewares/error-handler.js'
import { connectDB } from './api/db/db.js'
import { setupRoutes } from './api/routes/routes.js'
import morgan from 'morgan'

// CONFIGURATION
const app = express()

// LOGGING MIDDLEWARE
app.use(morgan('dev'))

// MONGOOSE SETUP
connectDB(); // Menjalankan fungsi connectDB di sini

// MIDLEWARES
app.use(express.json())
app.use(cookieParser())

// ROUTES
setupRoutes(app)

// ERROR MIDDLEWARE
app.use(errorHandler)

app.listen(PORT_SERVER, () => {
    console.log(`Server connected to PORT: ${PORT_SERVER}`)
})