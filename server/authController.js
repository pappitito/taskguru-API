const User = require('./usermodel')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const register = async (req,res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).send('please input name email and password')
    }
  /*  const salt = await bcrypt.genSalt(10)
    const HashedPassword = await bcrypt.hash(password, salt)

    const tempUser = {name, email, password: HashedPassword} 
    */
    if(password.length < 6){
        return res.status(StatusCodes.BAD_REQUEST).send('password must be greater than 6')
    }
    const user = await User.create(req.body)
    const token = user.createToken()
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})

}

const login = async (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).send('please input email and password')
    }
    const user = await User.findOne({email: email})
    const passwordCorrect = await user.checkPassword(password)
    if(!user){
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid useranme or password')
    }
    
    if(!passwordCorrect){
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid useranme or password')
    }
    const token = user.createToken()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {login, register} 
