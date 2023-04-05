import { User } from "../models/user.model.js"
import { createError } from "../utils/createError.js"

const deleteUser = async (req, res, next) => {
    // is the token exist?
    // const { accesToken } = req.cookies
    const user = await User.findById(req.params.id) // params is -> /:id
    // console.log(`token :${token}`)
    console.log(`req.userId dari user.con : ${req.userId}`)
    console.log(`user._id dari user.con : ${user._id.toString()}`)
    console.log(`req.userID: ${req.userId}`)
    // console.log(user._id.toString())

    // Input new object -> key=userId : value=user._id.toString()
    if(req.userId !== user._id.toString()){
        return next(createError(403, "You can delete only your account!"))
    }
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).send('deleted sucesfull')
    }



export { deleteUser }