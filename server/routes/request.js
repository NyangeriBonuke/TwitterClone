const express = require('express')
const router = express.Router()
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')

router.post('/', async function(req, res, next){
    res.header('Access-Controll-Allow-Origin', 'http://localhost:3000')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    const redirectUrl = 'http://127.0.0.1:8000/oauth'

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'conset'
    })

    res.json({url: authorizeUrl})
})