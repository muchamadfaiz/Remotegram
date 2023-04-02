import {User} from '../models/user.model.js'

const register = async (req, res) => {
    try{
        const user = new User({
            username:"qwerty4",
            password:"test2"
        })
        const result = await user.save()
        res.status(201).json({status: "success", message: "berhasil dibuat"})
        console.log(result)
    }catch(err){
        console.log('Error: ', err.message)
        res.status(500).json({status: "error", message: err.message})
    }
}

const login = (req, res) => {
    res.send('login')
}

export {register, login}