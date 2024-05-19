const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/request')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

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