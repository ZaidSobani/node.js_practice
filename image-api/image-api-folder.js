const express = require('express')
const app = express()

const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


app.post('/api/image', upload.single('image'), (req, res) => {
    if (req.file) {
        res.status(200).send(`${req.file.filename} has been uploaded`)
    }
    else {
        res.status(400).send('no file has been uploaded')
    }
})

app.get('/api/image', (req, res) => {
    const { qImage } = req.query
    const options = { root: path.join(__dirname, 'uploads') }
    res.sendFile(`${qImage}`, options, (err) => {
        if (err) throw err
        console.log(`The file has been sent`)
    })
})


app.listen(5000, () => {
    console.log('Server is listening on 5000')
})
