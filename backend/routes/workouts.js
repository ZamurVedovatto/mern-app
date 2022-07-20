const express = require('express')

const router = express.Router()

// GET ALL
router.get('/', (req, res) => {
    res.json({
        message: "get all workouts"
    })
})

// GET ONE
router.get('/:id', (req, res) => {
    res.json({
        message: "get one workout"
    })
})

// POST ONE
router.post('/', (req, res) => {
    // req.body
    res.json({
        message: "post workout"
    })
})

// DELETE ONE
router.delete('/', (req, res) => {
    res.json({
        message: "delete workout"
    })
})

// EDIT ONE
router.patch('/', (req, res) => {
    res.json({
        message: "patch workout"
    })
})

module.exports = router