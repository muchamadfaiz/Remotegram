import { User } from '../models/user.model.js'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
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
        console.log('Error: ', err.message)
        res.status(500).json({ status: "error", message: err.message })
    }
}

const login = async (req, res) => {
    try {
        // Take password in DB and store it into variable
        const { username } = req.body
        const user = await User.findOne({ username })

        // check user
        if (!user) return res.status(404).json({ status: "error", message: "User not found" })

        // comparing password in DB with client
        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return res.status(400).json({ status: "error", message: "wrong password or username" })

        // create Token
        const token = jwt.sign({
           id: user._id,
           email: user.email
        }, process.env.JWT_KEY)

        // if everything OK show user
        const { password, ...info } = user._doc
        res
        .cookie("accessToken", token)
        .status(200)
        .send(info)
    }
    catch (err) {
        // console.log("Error: ", err)
        res.status(500).json({ status: "error", message: err.message })
    }
}

export { register, login }