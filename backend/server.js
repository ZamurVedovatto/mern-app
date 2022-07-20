require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT

// express app
const app = express()

// middlewares
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app routes
app.get('/', (req, res) => {
    res.json({
        message: "welcome to the app"
    })
})

// listen for requests
app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
})