const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/request')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use(cookieSession({
    name: "session",
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100
}))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE, PUT',
    credentials: true
}))


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to mongodb')
})
.catch((error) => {
    console.log(error)
})

app.listen(process.env.PORT, () => {
    console.log('Server started')
})