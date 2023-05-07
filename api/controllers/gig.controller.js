import { Gig } from "../models/gig.model.js"
import { createError } from "../utils/createError.js"
import { HTTP_STATUS } from "../utils/httpStatusCodes.js"

// @desc Create a gig
// @route POST /api/gigs
// @access Private (Only seller can create a gig)
const createGig = async (req, res, next) => {
    try {
        if (!req.isSeller) {
            return next(createError(HTTP_STATUS.FORBIDDEN, "Only seller can create a gig!"))
        } else {
            const gig = new Gig({
                user_id: req.user_id,
                username: req.username,
                ...req.body,
            })
            const savedGig = await gig.save()
            res.status(HTTP_STATUS.CREATED).json(savedGig)
        }
    } catch (err) {
        next(err)
    }
}

const deleteGig = async (req, res, next) => {
    try {
        // query document yg sama dengan params.id
        const gigId = req.params.id
        const gig = await Gig.findById(gigId) //mengembalikan document sesuai id params

        if (req.user_id !== gig.user_id) {
            // // console.log(Gig.findById(req.UserId))
            // res.send("You can delete only your gig!")
            return next(createError(HTTP_STATUS.FORBIDDEN, "You can delete only your gig!"))
        } else {
            console.log("siap mendelete karena user sama")
            // console.log(req.params.id)
            await Gig.findByIdAndDelete(req.params.id)
            // console.log("disini")
            res.status(HTTP_STATUS.OK).send("Gig deleted")
        }
    } catch (err) {
        next(err)
    }
}

const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) {
            return next(createError(HTTP_STATUS.NOT_FOUND, "Gig not found!!"))
        } else {
            res.status(HTTP_STATUS.OK).send(gig)
        }
    } catch (err) {
        next(err)
    }
}

const getGigs = async (req, res, next) => {
    try {
        const gigs = await Gig.find()
        res.status(HTTP_STATUS.OK).send(gigs)
    } catch (err) {
        next(err)
    }
}

const updateGig = async (req, res, next) => {
    const gigId = req.params.id
    const gig = await Gig.findById(gigId)
    const { title, description, price } = req.body
    try {
        if (req.user_id !== gig.user_id) {
            return (next(createError(HTTP_STATUS.FORBIDDEN, 'You can update only your gig!')))
        } else {
            const updatedgig = await Gig.findByIdAndUpdate(gigId, { title, description, price }, { new: true, runValidators: true })
            res.status(HTTP_STATUS.OK).send(updatedgig)
        }
    } catch (err) {
        next(err)
    }


}
export { createGig, deleteGig, getGig, getGigs, updateGig }