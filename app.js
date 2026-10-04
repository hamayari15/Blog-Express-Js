require('dotenv').config()
const express = require('express');
require('./config/database.js')

const ArticleRoute = require('./routes/article.js') 
const AuthorRoute = require('./routes/author.js') 

const app = express();
app.use(express.json());

app.use(express.static('./Uploads'))

app.use('/Article', ArticleRoute)
app.use('/Author', AuthorRoute)


const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`Server work on port ${port}`)
})