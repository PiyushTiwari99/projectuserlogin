const mongoose = require('mongoose')

const userrrSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        requried: true,
        unique: true
    },
    email: {
        type: String,
        requried: true,
        Unique: true
    },
    password: {
        type: String,
        requried: true,
        Unique: true
    }

}, { timestamps: true })


module.exports = mongoose.model('userrr', userrrSchema)