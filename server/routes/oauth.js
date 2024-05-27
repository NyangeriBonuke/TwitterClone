const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login/success', (req, res) => {
    if(req.user){
        res.status(200).json({
            error: false,
            message: "Successfully logged in",
            user: req.user
        })
    }
    else{
        res.status(403).json({error: true, message: "Not authorized"})
    }
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res){
    res.redirect('/home')
})

router.get('/google', passport.authenticate('google', ['profile', 'email']))

router.get('/logout', (req, res) => {
    req.logout()
    req.redirect(process.env.CLIENT_URL)
})

module.exports = router