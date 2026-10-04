const mongoose = require('mongoose')

const Author = mongoose.model('Author', {

    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    about: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})


module.exports = Author;