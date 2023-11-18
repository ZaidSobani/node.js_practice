const express = require('express')
const app = express()
const Category = require('../services/models/category')
const CategoryServices = require('../services/category-services')


app.post('/', (req, res) => {

    if (!req.body.name) {
        res.status(400).json({ success: false, msg: 'Please provide Category name' })
    }
    const category = new Category()
    category.CategoryName = req.body.name
    category.createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    category.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const categoryService = new CategoryServices(category)
    categoryService.Add()
})

app.put('/:CategoryID', (req, res) => {
    const { CategoryID } = req.params
    const category = new Category()
    category.CategoryName = req.body.name
    category.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const categoryService = new CategoryServices(category, CategoryID)
    categoryService.Update()

})

app.delete('/:CategoryID', (req, res) => {
    const { CategoryID } = req.params
    const categoryService = new CategoryServices(undefined, CategoryID)
    categoryService.Delete()
})

app.get('/:CategoryID', (req, res) => {
    const { CategoryID } = req.params
    const categoryService = new CategoryServices(undefined, CategoryID)
    categoryService.Get()
})

app.get('/', (req,res) => {
    const categoryService = new CategoryServices()
    categoryService.GetAll()
})

module.exports = app