const express = require('express')
const {connectDB} = require('./connect')
const {router} = require('./taskRoute')
const { errorHandler } = require('./error-handler')
require('dotenv').config()

const authRouter = require('./authRoute')
const authenticateUser = require('./authMiddleware')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const ratelimit = require('express-rate-limit')


const app = express()

const port = process.env.PORT || 5000

async function start(){
    try{
        await connectDB(process.env.mongo_uri)
        console.log('connected to the DB')
        app.listen(port, console.log(`server is listening on port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}
start()

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 100
})
app.use(limiter)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/tasks',authenticateUser, router)
app.use('/api/users', authRouter)

app.use(errorHandler)
