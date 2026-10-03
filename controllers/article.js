const Article = require('../models/Article.js')
const { getFileName, resetFileName } = require('../middelwares/upload.js')

const addArticle = (req, res) => {
    let Data = req.body
    let Art = new Article(Data)
    Art.date = new Date()
    Art.image = getFileName()
    Art.tags = Data.tags.split(',')

    Art.save()
        .then((savedArticle) => {
            resetFileName()
            res.status(200).send(savedArticle)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const getAllArticles = (req, res) => {
    Article.find()
        .then((Articles) => {
            res.status(200).send(Articles)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const getArticleById = (req, res) => {
    let id = req.params.id

    Article.findOne({ _id: id })
        .then((Article) => {
            res.status(200).send(Article)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const getArticlesByAuthor = (req, res) => {
    let id = req.params.id
    Article.find({ idAuthor: id })
        .then((Articles) => {
            res.status(200).send(Articles)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const updateArticle = (req, res) => {
    let id = req.params.id
    let newData = req.body

    newData.tags = newData.tags.split(',')

    if (getFileName().length > 0) {
        newData.image = getFileName()
    }

    Article.findByIdAndUpdate({ _id: id }, newData)
        .then((updatedArticle) => {
            resetFileName()
            res.status(200).send(updatedArticle)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const deleteArticle = (req, res) => {
    let id = req.params.id

    Article.findByIdAndDelete({ _id: id })
        .then((deletedArticle) => {
            res.status(200).send(deletedArticle)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

module.exports = {
    addArticle,
    getAllArticles,
    getArticleById,
    getArticlesByAuthor,
    updateArticle,
    deleteArticle
}
