import mongoose from "mongoose"

// Creating Schema
const gigSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps:true}) //option in Schema

// Compiling model
const Gig = mongoose.model('Gig', gigSchema)
// Export model
export { Gig }