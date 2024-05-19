const express = require('express')
const router = express.Router()
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')

router.post('/', async(req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Referrer-Policy', 'no-referrer-when-downgrad')
    const redirectUrl = 'http://127.0.0.1:8000/oauth'

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    })

    res.json({url: authorizeUrl})
})

const getUserData = async(access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`)
    const data = await response.json()
    console.log('data', data)
}

router.get('/', async(req, res, next) => {
    const code = req.query.code
    try{
        const redirectUrl = 'http://127.0.0.1:8000/oauth'
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        )
        const response = await oAuth2Client.getToken(code)
        await oAuth2Client.setCredentials(response.token)
        const user = oAuth2Client.credentials
        console.log('credentials', user)
        await getUserData(user.access_token)
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router