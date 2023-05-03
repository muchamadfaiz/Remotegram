import mongoose from "mongoose"

// Creating Schema
const gigSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
//option in Schema
{timestamps:true}
) 

// Compiling model
const Gig = mongoose.model('Gig', gigSchema)
// Export model
export { Gig }