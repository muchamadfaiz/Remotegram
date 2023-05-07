import { User } from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { createError } from '../utils/createError.js'
import { HTTP_STATUS } from '../utils/httpStatusCodes.js'

const register = async (req, res, next) => {
    try {
        const { password } = req.body
        const hashedPassword = bcrypt.hashSync(password, 5)
        const user = new User({
            ...req.body,
            password: hashedPassword
        })
        const result = await user.save()
        res.status(HTTP_STATUS.CREATED).json({ status: "success", message: "berhasil dibuat" })
        console.log(result)
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        // search for username in DB and store it into variable
        const { username } = req.body
        const user = await User.findOne({ username })

        // check user

        if (!user) return next(createError(HTTP_STATUS.NOT_FOUND, "User is not found!"))

        // comparing password in DB and DB in client
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(createError(HTTP_STATUS.BAD_REQUEST, "Wrong password or username"))

        // create payload and Token for using in authorization
        const token = jwt.sign({
            username: user.username,
            id: user._id,
            email: user.email,
            isSeller: user.isSeller
        }, process.env.JWT_KEY, { expiresIn: '1d' })

        // if everything OK show user
        const { password, ...info } = user._doc
        console.log(`Login Succesfull!! as ${username}`)
        res
            .cookie("accessToken", token, {
                httponly: true,
            })
            .status(HTTP_STATUS.OK)
            .send(info)
    }
    catch (err) {
        // console.log("Error: ", err)
        next(err)
    }
}

const logout = (req, res) => {
    res.clearCookie("accessToken")
        .status(HTTP_STATUS.OK).send("user has been logged Out!")
}
export { register, login, logout }