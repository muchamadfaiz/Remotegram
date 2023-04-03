import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

const deleteUser = async (req, res) => {
    // is the token exist?
    // const { accesToken } = req.cookies
    const user = await User.findById(req.params.id)
    // console.log(`token :${token}`)
    console.log(`req.userId dari user.con : ${req.userId}`)
    console.log(`user._id dari user.con : ${user._id.toString()}`)
    // console.log(user._id.toString())

    if(req.userId !== user._id.toString()){
        return res.status(403).send("You can delete only your account!")
    }
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).send('deleted sucesfull')
    }



export { deleteUser }