import mongoose from "mongoose"

// Creating Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'nama harus diisi'],
        unique: [true, 'nama ga boleh duplikat'],
        minlength: [5, 'minimal 5 karakter'],
        maxlength: [20, 'maximal 20 karakter']
    },
    password: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
)

// compiling model
const User = mongoose.model('User', userSchema)
export { User }