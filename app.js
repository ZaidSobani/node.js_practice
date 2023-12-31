const express = require('express')
const app = express()

const faqAPI = require('./api/faq-api')
const categoryAPI = require('./api/category-api')
const productAPI = require('./api/product-api')
const ImageAPI = require('./image-api/image-api-folder')

app.use(express.json())

app.use('/api/faq', faqAPI)
app.use('/api/category', categoryAPI)
app.use('/api/products', productAPI)
app.use('/api/image', ImageAPI)

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})


