const express = require('express')
const Router = express.Router()

const { upload } = require('../middelwares/upload.js')
const auth = require('../middelwares/auth.js')

const {
    addArticle,
    getAllArticles,
    getArticleById,
    getArticlesByAuthor,
    updateArticle,
    deleteArticle
} = require('../controllers/article.js')


Router.post(
    '/Add',
    auth,
    upload.any('image'),
    addArticle
)

Router.get(
    '/getAll',
    getAllArticles
)

Router.get(
    '/getById/:id',
    getArticleById
)

Router.get(
    '/getByIdAuthor/:id',
    getArticlesByAuthor
)

Router.put(
    '/update/:id',
    auth,
    upload.any('image'),
    updateArticle
)

Router.delete(
    '/delete/:id',
    auth,
    deleteArticle
)

module.exports = Router
