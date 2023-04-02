import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

const deleteUser = async (req, res) => {
    // is the token exist?
    // const { accesToken } = req.cookies
    const token = req.cookies.accessToken
    const user = await User.findById(req.params.id)
    // console.log(`token :${token}`)
    if(!token) return res.status(401).json({status:"eror", message:"You are not log in"})

    jwt.verify(token, process.env.JWT_KEY, async (err, payload ) => {
        // res.send(payload)
        if(payload.id !== user._id.toString()){
            return res.status(403).send("You can delete only your account!")
        }
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(200).send('deleted sucesfull')
    })

}

export { deleteUser }