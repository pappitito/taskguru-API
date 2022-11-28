const express = require('express')
const tasks = require('./taskmodel')
const {asyncWrapper} = require('./async')
const {StatusCodes} = require('http-status-codes')


const getAllLogs = asyncWrapper(async (req,res) =>{

        const alltasks = await tasks.find({createdBy: req.user.userId}).sort('createdAt')
        res.status(StatusCodes.OK).json({ alltasks})


})

const createNewLog = asyncWrapper(async (req,res) => {
        req.body.createdBy = req.user.userId
  
        const newTask = await tasks.create(req.body)
        const alltasks = await tasks.find({createdBy: req.user.userId}).sort('createdAt')
        res.status(200).json({alltasks})

})

/*const getLog = asyncWrapper(async (req,res) => {
    const {id} = req.params
        const log = await logs.findOne({ _id:id })
        res.status(201).json({log})
        if(!log){
            return res.status(404).json({ message: `no log with id: ${id}`})
        }


}) */

const editLog = asyncWrapper(async (req,res) =>{
    
        const {id} = req.params 
        const task = await tasks.findOneAndUpdate({_id: id, createdBy: req.user.userId}, req.body, { new: true, runValidators: true})
        const alltasks = await tasks.find({createdBy: req.user.userId}).sort('createdAt')
        
        res.status(200).json({alltasks})
        if(!task){
            return res.status(404).json({ message: `no log with id: ${id}`})
        }


})

const deleteLog = asyncWrapper(async(req,res) =>{
    const {id} = req.params
        const task = await tasks.findOneAndDelete({_id: id, createdBy: req.user.userId})
        const alltasks = await tasks.find({createdBy: req.user.userId}).sort('createdAt')
        res.status(200).json({alltasks})
        if(!task){
            return res.status(404).json({ message: `no log with id: ${id}`})
        }


})


module.exports = {getAllLogs, createNewLog, deleteLog, editLog}