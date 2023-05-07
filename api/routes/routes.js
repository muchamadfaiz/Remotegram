import { gigRoute } from "./gig.route.js"
import { userRoute } from "./user.route.js"
import { authRoute } from "./auth.route.js"

const setupRoutes = (app) => {
    app.use('/api', authRoute)
    app.use('/api', userRoute)
    app.use('/api', gigRoute)
}

export { setupRoutes }