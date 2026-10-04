const Author = require('../models/Author')
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sanitizeAuthor = author => {
    const { password, ...safe } = author.toObject()
    return safe
}


const registerAuthor = (req, res) => {
    const data = req.body || {}
    const author = new Author(data)
    author.image = req.uploadedFileName || ''

    const validationError = author.validateSync()
    if (validationError) {
        return res.status(400).send(validationError.message)
    }

    const salt = Bcrypt.genSaltSync(10)
    author.password = Bcrypt.hashSync(data.password, salt)

    author.save()
        .then((savedAuthor) => {
            res.status(200).send(sanitizeAuthor(savedAuthor))
        })
        .catch((err) => {
            if (err.code === 11000) {
                return res.status(409).send('Email already registered')
            }
            if (err.name === 'ValidationError') {
                return res.status(400).send(err.message)
            }
            res.status(500).send(err)
        })
}


const loginAuthor = (req, res) => {
    const data = req.body || {}
    if (!data.email || !data.password) {
        return res.status(400).send('Email and password are required')
    }

    Author.findOne({ email: data.email })
        .then((author) => {
            if (!author || !Bcrypt.compareSync(data.password, author.password)) {
                return res.status(401).send('Email or password invalid')
            }

            const payload = {
                _id: author._id,
                email: author.email,
                fullName: `${author.name} ${author.lastName}`
            }

            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' })
            res.status(200).send({ myToken: token })
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}


const getAuthorById = (req, res) => {
    const id = req.params.id
    if (req.author._id !== id) {
        return res.status(403).send('You are not allowed to access this account')
    }

    Author.findById(id)
        .then((author) => {
            if (!author) {
                return res.status(404).send('Author not found')
            }
            res.status(200).send(sanitizeAuthor(author))
        })
        .catch((err) => {
            const status = err.name === 'CastError' ? 400 : 500
            res.status(status).send(err.message)
        })
}


const deleteAuthor = (req, res) => {
    const id = req.params.id
    if (req.author._id !== id) {
        return res.status(403).send('You are not allowed to delete this account')
    }

    Author.findByIdAndDelete(id)
        .then((deletedAuthor) => {
            if (!deletedAuthor) {
                return res.status(404).send('Author not found')
            }
            res.status(200).send(sanitizeAuthor(deletedAuthor))
        })
        .catch((err) => {
            const status = err.name === 'CastError' ? 400 : 500
            res.status(status).send(err.message)
        })
}

module.exports = {
    registerAuthor,
    loginAuthor,
    getAuthorById,
    deleteAuthor
}