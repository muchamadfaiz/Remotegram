import jwt from "jsonwebtoken"
import { createError } from "../utils/createError.js"

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return next(createError(401, "You are not authenticated"))

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return next(createError(401, "Token expired"));
            }
            else if (err.name === 'JsonWebTokenError') {
                return next(createError(403, 'Token is not valid!'))
            } else {
                return next(createError(403, "Somethin went wrong with token validation"));
            }
        }
        if (!payload.id || !payload.hasOwnProperty("isSeller") || !payload.username) {
            return next(createError(403, 'Invalid token payload'))
        }
        req.user_id = payload.id
        req.isSeller = payload.isSeller
        req.username = payload.username
        next()
    })
}

export { verifyToken }