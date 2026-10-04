const mongoose = require('mongoose')

const article = mongoose.model('article', {

    title: {
        type: String,
        required: true,
        trim: true
    },
    idAuthor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    tags: {
        type: [String],
        required: true,
        validate: {
            validator: tags => Array.isArray(tags) && tags.length > 0,
            message: 'At least one tag is required'
        }
    }
})


module.exports = article;