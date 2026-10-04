const Author = require('../models/Author')
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getFileName, resetFileName } = require('../middelwares/upload.js')

const registerAuthor = (req, res) => {
    let data = req.body
    let author = new Author(data)
    author.image = getFileName()

    salt = Bcrypt.genSaltSync(10)
    author.password = Bcrypt.hashSync(data.password, salt)
    author.save().then((savedAuthor) => {
        resetFileName()
        res.status(200).send(savedAuthor)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

const loginAuthor = (req, res) => {
    let data = req.body

    Author.findOne({ email: data.email }).then((author) => {

        if (!author) {
            return res.status(404).send('Email or password invalid!');
        }

        let validPassword = Bcrypt.compareSync(data.password, author.password)
        if (!validPassword) {
            res.status(500).send('Email or password invalid !')
        }
        else {
            const peyload = {
                _id: author._id,
                email: author.email,
                fullName: author.name + ' ' + author.lastName
            }

            let token = jwt.sign(peyload, '123456')
            res.status(200).send({ myToken: token })
        }
    })
}

const getAuthorById = (req, res) => {
    id = req.params.id
    if (req.author._id !== id) {
        return res.status(403).send('You are not allowed to access this account')
    }
    Author.findOne({ _id: id }).then((Author) => {
        res.status(200).send(Author)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

const deleteAuthor = (req, res) => {
    id = req.params.id
     if (req.author._id !== id) {
        return res.status(403).send('You are not allowed to delete this account')
    }
    Author.findByIdAndDelete({ _id: id }).then((deletedAuthor) => {
        res.status(200).send(deletedAuthor)
    }).catch((err) => {
        res.status(500).send(err)
    })
}

module.exports = {
    registerAuthor,
    loginAuthor,
    getAuthorById,
    deleteAuthor
}
