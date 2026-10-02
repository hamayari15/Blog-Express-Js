const express = require('express');
require('./config/database.js')

const ArticleRoute = require('./routes/article.js') 
const AuthorRoute = require('./routes/author.js') 

const app = express();
app.use(express.json());

app.use(express.static('./Uploads'))

app.use('/Article', ArticleRoute)
app.use('/Author', AuthorRoute)


app.listen(3000, () => {
    console.log("Server work on port 3000")
})