require('dotenv').config()
const express = require('express')

const PORT = process.env.PORT
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

// listen for requests
app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
})