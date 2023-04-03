import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).send("You are not authenticated!")

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return res.status(403).send("Token is not valid!")
        console.log(`payload dari middleware: ${payload}`)
        console.log(payload)
        console.log(`payload.id dari middleware: ${payload.id}`)
        req.userId = payload.id
        console.log(`req.userId dari middleware: ${req.userId}`)
        next()
    })
}

export { verifyToken }