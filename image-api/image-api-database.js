const express = require('express')
const app = express()

const db = require('../services/database/database')

const path = require('path')

const fileUpload = require('express-fileupload')
const { readFileSync, writeFileSync } = require('fs')



app.use(fileUpload())

app.post('/api/database/image', (req, res) => {

    const { image } = req.files
    const imagePath = path.resolve(__dirname, 'uploads', image.name)
    image.mv(imagePath, (err) => {
        const imageAfter = readFileSync(imagePath)
        db.query('INSERT INTO product_image (image) VALUES(?)', [imageAfter], (err, result) => {
            if (err) throw err
            console.log(image.name)
            res.send('image uploaded')
        })
    })
})

app.get('/api/database/image/:imageID', (req, res) => {
    const { imageID } = req.params
    db.query('SELECT * FROM product_image WHERE id=?', [imageID], (err, result) => {
        if (err) throw err
        if (result.length == 0) {
            return res.status(400).json({ success: false, msg: "record not founded" })
        }
        else {
            let resultTest = Object.values(JSON.parse(JSON.stringify(result)))
            const base64Image = Buffer.from(resultTest[0].image.data, 'base64')
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': base64Image.length
            })
            res.end(base64Image)
            
        }
    })
})

app.listen(5000, () => {
    console.log('Server is listening on 5000')
})
