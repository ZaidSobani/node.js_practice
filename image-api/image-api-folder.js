const express = require('express')
const app = express()

const db = require('../services/database/database')

const path = require('path')
const { readFileSync } = require('fs')

const crypto = require('node:crypto')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image-api/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomUUID() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


app.post('/:ImageID', upload.single('image'), (req, res) => {
    const { ImageID } = req.params

    const imageName = req.file.filename
    const imagePath = path.join(__dirname, 'uploads', imageName)
    const imageBuffer = readFileSync(imagePath)


    db.query('UPDATE products SET image=? WHERE id=?', [imageName, ImageID], (err, result) => {
        if (err) throw err
        res.send('Uploaded')
    })
})

app.get('/', (req, res) => {
    const { qImage } = req.query
    const options = { root: path.join(__dirname, 'uploads') }
    res.sendFile(`${qImage}`, options, (err) => {
        if (err) throw err
        console.log(`The file has been sent`)
    })
})


module.exports = app