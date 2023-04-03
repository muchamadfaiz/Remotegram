import { User } from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { createError } from '../utils/createError.js'

const register = async (req, res, next) => {
    try {
        const { password } = req.body
        const hashedPassword = bcrypt.hashSync(password, 5)
        const user = new User({
            ...req.body,
            password: hashedPassword
        })
        const result = await user.save()
        res.status(201).json({ status: "success", message: "berhasil dibuat" })
        console.log(result)
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        // Take password in DB and store it into variable
        const { username } = req.body
        const user = await User.findOne({ username })

        // check user

        if (!user) return next(createError(404,"User is not found!"))

        // comparing password in DB with client
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(createError(400, "Wrong password or username"))

        // create Token
        const token = jwt.sign({
           id: user._id,
           email: user.email
        }, process.env.JWT_KEY, {expiresIn: '60s'})

        // if everything OK show user
        const { password, ...info } = user._doc
        console.log("Login Succesfull!!")
        res
        .cookie("accessToken", token, {
            httponly: true,
        })
        .status(200)
        .send(info)
    }
    catch (err) {
        // console.log("Error: ", err)
        next(err)
    }
}

const logout = (req, res) => {
    res.clearCookie("accessToken")
    .status(200).send("User has been logged Out!")
}
export { register, login, logout }