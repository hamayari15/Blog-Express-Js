const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Bloggy')
    .then(() => {
        console.log("Connected to DB successfully !✅")
    }).catch((err) => {
        console.log(err)
        console.log("Error connecting to DB ❌")
    })


module.exports = mongoose;