require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const authRoutes = require('./routes/auth')
const workoutRoutes = require('./routes/workouts')
const clientRoutes = require('./routes/client')

// express app
const app = express()

// connect do db
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`connected to db & app running in port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(errir)
    })

// middlewares
app.use(
    cors({
        origin: true,
        credentials: true,
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app routes
app.use("/api/auth", authRoutes);
app.use('/api/workouts', workoutRoutes)
app.use('/api/client', clientRoutes)
// app.use('/api/user', userRoutes)
