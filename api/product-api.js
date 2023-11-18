const express = require('express')
const app = express()
const Product = require('../services/models/product')
const ProductServices = require('../services/product-services')
const Category = require('../services/models/category')


app.post('/', (req, res) => {

    if (!req.body.name || !req.body.price || !req.body.discountPrice) {
        res.status(400).json({ success: false, msg: 'Please provide the required data' })
    }

    const product = new Product()
    product.producrName = req.body.name
    product.price = req.body.price
    product.discountPrice = req.body.discountPrice
    product.categoryId = req.body.categoryId
    product.createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    product.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const productService = new ProductServices(product)
    productService.Add()
})

app.put('/:ProductID', (req, res) => {
    const { ProductID } = req.params

    const product = new Product()
    product.producrName = req.body.name
    product.price = req.body.price
    product.discountPrice = req.body.discountPrice
    product.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const productService = new ProductServices(product, ProductID)
    productService.Update()
})

app.delete('/:ProductID', (req, res) => {
    const { ProductID } = req.params

    const productService = new ProductServices(undefined, ProductID)
    productService.Delete()
})

app.get('/:ProductID', (req, res) => {
    const { ProductID } = req.params

    const category = new Category()
    const product = new Product()

    const productService = new ProductServices(product, ProductID, category)
    productService.Get((product) => {
        res.send(product)
    })
})

app.get('/', (req, res) => {
    const product = new Product()
    const category = new Category()

    const productService = new ProductServices(product, undefined, category)
    productService.GetAll((product) => {
        res.send(product)
    })
})

module.exports = app


