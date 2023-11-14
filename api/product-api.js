const express = require('express')
const app = express()
const product = require('../services/models/product')
const { Add, Update, Delete, Get, GetAll } = require('../services/product-services')


app.post('/', (req, res) => {

    if (!req.body.name || !req.body.price || !req.body.discountPrice) {
        res.status(400).json({ success: false, msg: 'Please provide the required data' })
    }

    product.producrName = req.body.name
    product.price = req.body.price
    product.discountPrice = req.body.discountPrice
    product.categoryId = req.body.categoryId
    product.createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    product.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    Add(req, res, product)
})

app.put('/:ProductID', (req, res) => {
    const { ProductID } = req.params
    product.producrName = req.body.name
    product.price = req.body.price
    product.discountPrice = req.body.discountPrice
    product.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    Update(req, res, product, ProductID)
})

app.delete('/:ProductID', (req, res) => {
    const { ProductID } = req.params
    Delete(req, res, ProductID)
})

app.get('/:ProductID', (req, res) => {
    const { ProductID } = req.params
    Get(req, res, ProductID)
})

app.get('/', GetAll)

module.exports = app


