const express = require('express')
const router = express.Router()
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')

async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`)
    const data = await response.json()
}

router.get('/', async function(req, res, next){
    const code = req.query.code
    try{
        const redirectUrl = 'https://127.0.0.1:8000/oauth'

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        )

        const response = await oAuth2Client.getToken(code)
        await oAuth2Client.setCredentials(res.tokens)
        console.log('Tokens aquired')
        const user = oAuth2Client.credentials
        console.log('credentials', user)
        await getUserData(user.access_token)
    }
    catch(err){
        console.log('Error with signing in with google')
    }
})