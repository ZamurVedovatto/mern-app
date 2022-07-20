const express = require('express')
const Workout = require('./../models/workoutModel')

const router = express.Router()

// GET ALL
router.get('/', async(req, res) => {
    try {
        const data = await Workout.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// GET ONE
router.get('/:id', async(req, res) => {
    const { id } = req.params
    try {
        const data = await Workout.findById(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// POST ONE
router.post('/', async(req, res) => {
    const { title, reps, load } = req.body
    try {
        const data = await Workout.create({ title, reps, load })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE ONE
router.delete('/:id', async(req, res) => {
    const { id } = req.params
    try {
        const data = await Workout.findById(id)
        await Workout.deleteOne({ _id: data._id })
        res.status(200).json({
            message: `instance deleted (${data._id})`
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// EDIT ONE
router.patch('/:id', async(req, res) => {
    const { id } = req.params
    const patchData = req.body
    try {
        const data = await Workout.findByIdAndUpdate((id),patchData)
        const updatedData = await Workout.findById(id)
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router