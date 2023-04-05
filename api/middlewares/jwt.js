import jwt from "jsonwebtoken"
import { createError } from "../utils/createError.js"

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return next(createError(403, "Token is not valid!"))
        console.log(payload)
        console.log(`payload.id dari middleware: ${payload.id}`)
        console.log(`payload.isSeller dari middleware: ${payload.isSeller}`)
        req.userId = payload.id
        req.isSeller = payload.isSeller
        console.log(`req.userId dari middleware: ${req.userId}`)
        next()
    })
}

export { verifyToken }