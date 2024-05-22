const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/request')
const session = require('express-session')
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2').strategy
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, DELETE, PUT',
    credentials: true
}))

app.use(session({
    secret: 'ajkdjfakdjfa3dkfja4dkfadfafafadfa',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new OAuth2Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:8000/api/sessions/oauth/google',
        scope: ['profile', 'email']
    }),

    
)

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