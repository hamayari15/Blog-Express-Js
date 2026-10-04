const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB successfully !✅")
    }).catch((err) => {
        console.log(err)
        console.log("Error connecting to DB ❌")
    })


module.exports = mongoose;