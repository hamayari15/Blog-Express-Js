const multer = require('multer')

const myStorage = multer.diskStorage({
    destination: './Uploads',
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
        req.uploadedFileName = name
        cb(null, name)
    }
})

const upload = multer({ storage: myStorage })

module.exports = { upload }