const mongoose = require('mongoose')

const Author = mongoose.model('Author', {

    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    about: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String
    }
})


module.exports = Author;