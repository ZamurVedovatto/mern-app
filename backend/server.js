require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

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

