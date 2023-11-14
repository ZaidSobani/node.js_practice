const express = require('express')
const app = express()
const category = require('../services/models/category')
const { Add, Update, Delete, Get, GetAll } = require('../services/category-services')


app.post('/', (req, res) => {

    if (!req.body.name) {
        res.status(400).json({ success: false, msg: 'Please provide Category name' })
    }

    category.CategoryName = req.body.name
    category.createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    category.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    Add(req, res, category)
})

app.put('/:CategoryID', (req, res) => {
    const { CategoryID } = req.params
    category.CategoryName = req.body.name
    category.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    Update(req, res, category, CategoryID)
})

app.delete('/:CategoryID', (req, res) => {
    const { CategoryID } = req.params
    Delete(req, res, CategoryID)
})

app.get('/:CategoryID', (req, res) => {
    const { CategoryID } = req.params
    Get(req, res, CategoryID)
})

app.get('/', GetAll)

module.exports = app