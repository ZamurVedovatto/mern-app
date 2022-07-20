
const Workout = require('./../models/workoutModel')

const getAll = async(req, res) => {
    try {
        const data = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getOne = async(req, res) => {
    const { id } = req.params
    try {
        const data = await Workout.findById(id)
        if (!data) res.status(404).json({error: 'data not found'})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postOne = async(req, res) => {
    const { title, reps, load } = req.body
    try {
        const data = await Workout.create({ title, reps, load })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteOne = async(req, res) => {
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
}

const editOne = async(req, res) => {
    const { id } = req.params
    const patchData = req.body
    try {
        const data = await Workout.findByIdAndUpdate((id),patchData)
        const updatedData = await Workout.findById(id)
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    deleteOne,
    editOne
}