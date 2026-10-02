const express = require('express')

const Router = express.Router()

const Author = require('../models/Author')

const multer = require('multer')
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let fileName = ''

const myStorage = multer.diskStorage({
    destination: './Uploads',
    filename: (req, file, redirect) => {
        let date = Date.now()
        let fl = date + '.' + file.mimetype.split('/')[1]
        redirect(null, fl)
        fileName = fl
    }
});

const upload = multer({ storage: myStorage })


Router.post('/register', upload.single('image'), (req, res) => {
        
    let data = req.body
    let author = new Author(data)
    author.image = fileName
    
    salt = Bcrypt.genSaltSync(10)
    author.password = Bcrypt.hashSync(data.password, salt)
    author.save().then((savedAuthor) => {
        fileName = ''
        res.status(200).send(savedAuthor)
    }).catch((err) => {
        res.status(500).send(err)
    })

})



Router.post('/login', (req, res) => {

    let data = req.body

    Author.findOne({email: data.email}).then((author) => {

        if (!author) {
            return res.status(404).send('Email or password invalid!');
        }

        let validPassword = Bcrypt.compareSync(data.password, author.password)
        if(!validPassword) {
            res.status(500).send('Email or password invalid !')
        }
        else {
            const peyload = {
                _id: author._id,
                email: author.email,
                fullName: author.name + ' ' + author.lastName
            }

            let token = jwt.sign(peyload, '123456')
            res.status(200).send({myToken: token})
        }
    })
})



Router.get('/getAll', (req, res) => {

    Author.find().then((Authors) => {
        res.status(200).send(Authors)
    }).catch((err) => {
        res.status(500).send(err)
    })
})



Router.get('/getById/:id', (req, res) => {

    id = req.params.id
    Author.findOne({_id: id}).then((Author) => {
        res.status(200).send(Author)
    }).catch((err) => {
        res.status(500).send(err)
    })
})



Router.delete('/delete/:id', (req, res) => {

    id = req.params.id
    Author.findByIdAndDelete({_id: id}).then((deletedAuthor) => {
        res.status(200).send(deletedAuthor)
    }).catch((err) => {
        res.status(500).send(err)
    })
})





module.exports = Router