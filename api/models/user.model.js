import mongoose from "mongoose"

// Creating Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add the username'],
        unique: [true, 'The username is not available'],
        minlength: [5, 'minimum length is 5 characters'],
        maxlength: [20, 'maximal length is 20 characters']
    },
    password: {
        type: String,
        required: [true,'Please add the password']
    },
    email: {
        type: String,
        required: [true,'Please add email address']
    },
    isSeller: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
)

// compiling model
const User = mongoose.model('User', userSchema)

// export model
export { User }