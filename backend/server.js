require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middlewares
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app routes
app.use('/api/workouts', workoutRoutes)

// connect do db
mongoose.connect(MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`connected to db & app running in port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(errir)
    })

