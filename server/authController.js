const User = require('./usermodel')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = async (req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({err: 'please input complete feild input'})

    }
    if(password.length < 5){
        return res.status(StatusCodes.BAD_REQUEST).json({err: 'password should be longer than five characters'})
    }

    try {
        const user = await User.create(req.body)
        const token = await user.createToken()
        return res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
    } catch (error) {
        
        if(error.code === 11000){
            return res.status(StatusCodes.BAD_REQUEST).json({err: 'email already in use'})
        }
        if(error._message === "user validation failed"){
            return res.status(StatusCodes.BAD_REQUEST).json({err: 'please input valid email'})
        }
        
        return res.status(StatusCodes.BAD_REQUEST).json({err: error})
        
    }
}

const login = async (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).send({err: "email and password required"})
    }
    const user = await User.findOne({email: email})
    var passwordCorrect
    try {
         passwordCorrect = await user.checkPassword(password)
    } catch (error) {
        
        return res.status(StatusCodes.UNAUTHORIZED).send({err: "Please provide a valid email"})
    }
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).send({err: "Invalid username or password"})
    }
    
    if(!passwordCorrect){
        return res.status(StatusCodes.UNAUTHORIZED).send({err: "Invalid username or password"})
    }
    const token = user.createToken()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {login, register} 
