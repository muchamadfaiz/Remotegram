import { Gig } from "../models/gig.model.js"
import { createError } from "../utils/createError.js"

const createGig = async (req, res, next) => {
    //TODO
    // is seller? if not throw error "only seller can create Gig"
    console.log(req.isSeller)
    console.log(`req.userId dari gig.con : ${req.userId}`)
    if (!req.isSeller) return next(createError(403, "Only seller can create a gig!"))
    // assign UserID into new document as params.id -> :/id
    const gig = new Gig({
        // ...req.body,
        userID: req.userId,
        ...req.body,
    })
    // store into on database
    try {
        const savedGig = await gig.save()
        res.status(201).json(savedGig)
    } catch (err) {
        next(err)
    }
}

const deleteGig = async (req, res, next) => {}
export { createGig }