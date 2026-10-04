const Article = require('../models/Article.js')

const normalizeTags = tags => {
    if (typeof tags === 'string') {
        return tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }

    if (Array.isArray(tags)) {
        return tags.map(tag => String(tag).trim()).filter(Boolean)
    }

    return tags
}

const pickArticleFields = body => {
    const allowed = ['title', 'description', 'content', 'tags']
    const picked = {}
    for (const key of allowed) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            picked[key] = body[key]
        }
    }
    return picked
}


const addArticle = (req, res) => {
    const data = pickArticleFields(req.body || {})
    const article = new Article(data)

    article.idAuthor = req.author._id
    article.date = new Date()
    article.image = req.uploadedFileName || ''
    article.tags = normalizeTags(data.tags)

    article.save()
        .then((savedArticle) => {
            res.status(200).send(savedArticle)
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                return res.status(400).send(err.message)
            }
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
    let newData = pickArticleFields(req.body || {})

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

            if (Object.prototype.hasOwnProperty.call(newData, 'tags')) {
                newData.tags = normalizeTags(newData.tags)
            }

            if (req.uploadedFileName) {
                newData.image = req.uploadedFileName
            }

            return Article.findByIdAndUpdate(
                id,
                newData,
                { new: true, runValidators: true }
            ).then((updatedArticle) => {
                res.status(200).send(updatedArticle)
            })
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'CastError') {
                return res.status(400).send(err.message)
            }
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

            if (article.idAuthor.toString() !== req.author._id) {
                return res.status(403).send(
                    'You are not allowed to delete this article'
                )
            }

            return Article.findByIdAndDelete(id).then((deletedArticle) => {
                res.status(200).send(deletedArticle)
            })
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