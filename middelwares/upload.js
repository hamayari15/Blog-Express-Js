const multer = require('multer')

let fileName = ''

const myStorage = multer.diskStorage({
    destination: './Uploads',
    filename: (req, file, redirect) => {
        let date = Date.now()
        let fl = date + '.' + file.mimetype.split('/')[1]
        redirect(null, fl)
        fileName = fl
    }
})

const upload = multer({ storage: myStorage })

const getFileName = () => fileName
const resetFileName = () => {
    fileName = ''
}

module.exports = {
    upload,
    getFileName,
    resetFileName
}
