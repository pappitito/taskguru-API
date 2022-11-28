const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv')

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, 'please input name'],
        minlength: 3,
        maxlength: 50

    },
    email :{
        type: String,
        required: [true, 'please input email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'
        ],
        unique: true

    },
    password :{
        type: String,
        required: [true, 'please input name'],
        minlength: 6,
      

    }
})

userSchema.pre('save', async function(){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)

})

userSchema.methods.checkPassword = async function(userPassword){
   try{
    const isMatch = await bcryptjs.compare(userPassword, this.password)
    return isMatch
   }catch(error){
    console.log(error)
   }
}

userSchema.methods.createToken = function(){
    return jwt.sign( {userId: this._id, name: this.name}, process.env.secret_key, {expiresIn: process.env.expiry})
}




module.exports = mongoose.model('user', userSchema)