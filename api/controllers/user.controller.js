import { User } from "../models/user.model.js"
import { createError } from "../utils/createError.js"
import { HTTP_STATUS } from "../utils/httpStatusCodes.js"

const deleteUser = async (req, res, next) => {
    // is the token exist?
    // const { accesToken } = req.cookies
    const user = await User.findById(req.params.id) // params is -> /:id
    // console.log(`token :${token}`)
    console.log(`req.user_id dari user.con : ${req.user_id}`)
    console.log(`user._id dari user.con : ${user._id.toString()}`)
    console.log(`req.user_id: ${req.user_id}`)
    // console.log(user._id.toString())

    // Input new object -> key=userId : value=user._id.toString()
    if(req.user_id !== user._id.toString()){
        return next(createError(HTTP_STATUS.FORBIDDEN, "You can delete only your account!"))
    }
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(HTTP_STATUS.OK).send('deleted sucesfull')
    }



export { deleteUser }