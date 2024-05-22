const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    displayName: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)