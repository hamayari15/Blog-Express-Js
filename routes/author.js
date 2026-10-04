const express = require('express')
const Router = express.Router()

const { upload } = require('../middelwares/upload.js')
const auth = require('../middelwares/auth.js')
const {
    registerAuthor,
    loginAuthor,
    getAuthorById,
    deleteAuthor
} = require('../controllers/author.js')

Router.post('/register', upload.single('image'), registerAuthor)
Router.post('/login', loginAuthor)
Router.get('/getById/:id', getAuthorById)
Router.delete('/delete/:id', auth, deleteAuthor)

module.exports = Router