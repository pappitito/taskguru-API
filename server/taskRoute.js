const express = require('express')
const mongoose = require('mongoose')
const {getAllLogs, createNewLog, deleteLog, editLog} = require('./taskController')
const tasks = require('./taskmodel')
const router = express.Router()


router.get('/',getAllLogs)

router.post('/', createNewLog)


router.patch('/:id', editLog)

router.delete('/:id',deleteLog)



module.exports = {router}