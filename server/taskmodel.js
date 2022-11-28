const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'please provide a user']
    }

  
}, {timestamps: true})

module.exports = mongoose.model('tasks', taskSchema)