import { Gig } from "../models/gig.model.js"
import { createError } from "../utils/createError.js"

const createGig = async (req, res, next) => {
    console.log(req.isSeller)
    console.log(`req.user_id dari gig.con : ${req.user_id}`)
    try {
        if (!req.isSeller) {
            return next(createError(403, "Only seller can create a gig!"))
        } else {
            const gig = new Gig({
                user_id: req.user_id,
                username: req.username,
                ...req.body,
            })
            const savedGig = await gig.save()
            res.status(201).json(savedGig)
        }
    } catch (err) {
        next(err)
    }
}

const deleteGig = async (req, res, next) => {
    try {
        // query document yg sama dengan params.id
        console.log(`ini userId ${req.user_id}`)
        console.log(`ini params ${req.params.id}`)
        const gigId = req.params.id
        const gig = await Gig.findById(gigId) //mengembalikan document sesuai id params

        console.log(gig)

        if (req.user_id !== gig.user_id) {
            // // console.log(Gig.findById(req.UserId))
            // res.send("You can delete only your gig!")
            return next(createError(403, "You can delete only your gig!"))
        } else {
            console.log("siap mendelete karena user sama")
            // console.log(req.params.id)
            await Gig.findByIdAndDelete(req.params.id)
            // console.log("disini")
            res.status(200).send("Gig deleted")
        }
    } catch (err) {
        next(err)
    }
}

const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) {
            return next(createError(404, "Gig not found!!"))
        } else {
            res.status(200).send(gig)
        }
    } catch (err) {
        next(err)
    }
}

const getGigs = async (req, res, next) => {
    try {
        const gigs = await Gig.find()
        res.status(200).send(gigs)
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
            return (next(createError(403, 'You can update only your gig!')))
        } else {
            const updatedgig = await Gig.findByIdAndUpdate(gigId, { title, description, price }, { new: true, runValidators: true })
            res.status(200).send(updatedgig)
        }
    } catch (err) {
        next(err)
    }


}
export { createGig, deleteGig, getGig, getGigs, updateGig }