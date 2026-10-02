const express = require('express')
const Router = express.Router()


const Article = require('../models/Article.js')
const multer = require('multer')

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

Router.post('/Add', upload.any('image'), (req, res) => {
    let Data = req.body
    let Art = new Article(Data)
    Art.date = new Date()
    Art.image = fileName
    Art.tags = Data.tags.split(',')

    Art.save()
        .then((savedArticle) => {
            fileName = ''
            res.status(200).send(savedArticle)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

Router.get('/getAll', (req, res) => {
    Article.find()
        .then((Articles) => {
            res.status(200).send(Articles)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})



Router.get('/getById/:id', (req, res) => {
     let id = req.params.id

     Article.findOne({_id: id})
        .then((Article) => {
            res.status(200).send(Article)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
});



Router.get('/getByIdAuthor/:id', (req, res) => {
     let id = req.params.id
     Article.find({idAuthor: id})
        .then((Articles) => {
            res.status(200).send(Articles)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
});




Router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id
    let newData = req.body

    newData.tags = newData.tags.split(',')

    if(fileName.length > 0) {
        newData.image = fileName
    }

    Article.findByIdAndUpdate({_id: id}, newData)
    .then((updatedArticle) => {
        fileName = ''
        res.status(200).send(updatedArticle)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
});




Router.delete('/delete/:id', (req, res) => {
    let id = req.params.id

    Article.findByIdAndDelete({_id: id})
    .then((deletedArticle) => {
        res.status(200).send(deletedArticle)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
});



module.exports = Router
