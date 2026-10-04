const Article = require('../models/Article.js')
const { getFileName, resetFileName } = require('../middelwares/upload.js')

const addArticle = (req, res) => {
    let Data = req.body
    let Art = new Article(Data)

    Art.idAuthor = req.author._id

    Art.date = new Date()
    Art.image = getFileName()
    Art.tags = Data.tags.split(',')

    Art.save()
        .then((savedArticle) => {
            resetFileName()
            res.status(200).send(savedArticle)
        })
        .catch((err) => {
            resetFileName()
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
        .then((article) => {

            if (!article) {
                return res.status(404).send('Article not found')
            }

            res.status(200).send(article)
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

    Article.findById(id)
        .then((article) => {

            if (!article) {
                return res.status(404).send('Article not found')
            }

            if (article.idAuthor.toString() !== req.author._id) {
                return res.status(403).send(
                    'You are not allowed to update this article'
                )
            }

            if (newData.tags) {
                newData.tags = newData.tags.split(',')
            }

            if (getFileName().length > 0) {
                newData.image = getFileName()
            }

            return Article.findByIdAndUpdate(
                id,
                newData,
                { new: true }
            )
        })
        .then((updatedArticle) => {

            if (!updatedArticle) {
                return
            }

            resetFileName()
            res.status(200).send(updatedArticle)
        })
        .catch((err) => {
            resetFileName()
            res.status(500).send(err)
        })
}

const deleteArticle = (req, res) => {
    let id = req.params.id

    Article.findById(id)
        .then((article) => {

            if (!article) {
                return res.status(404).send('Article not found')
            }

            // Authorization
            if (article.idAuthor.toString() !== req.author._id) {
                return res.status(403).send(
                    'You are not allowed to delete this article'
                )
            }

            return Article.findByIdAndDelete(id)
        })
        .then((deletedArticle) => {

            if (!deletedArticle) {
                return
            }

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
