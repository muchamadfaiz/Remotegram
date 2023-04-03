import mongoose from "mongoose"

// Creating Schema
const gigSchema = new mongoose.Schema({
    title: {
        type: String,
        required: trusted
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps:true})

// Compiling model
const Gig = mongoose.model('Gig', gigSchema)
// Export model
export { Gig }