const express = require('express')
const Router = express.Router()

const { upload } = require('../middelwares/upload.js')
const {
    addArticle,
    getAllArticles,
    getArticleById,
    getArticlesByAuthor,
    updateArticle,
    deleteArticle
} = require('../controllers/article.js')

Router.post('/Add', upload.any('image'), addArticle)

Router.get('/getAll', getAllArticles)



Router.get('/getById/:id', getArticleById);



Router.get('/getByIdAuthor/:id', getArticlesByAuthor);




Router.put('/update/:id', upload.any('image'), updateArticle);




Router.delete('/delete/:id', deleteArticle);



module.exports = Router
