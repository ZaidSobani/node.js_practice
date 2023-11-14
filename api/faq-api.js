const express = require('express')
const app = express()
const faq = require('../services/models/faq')
const { Add, Update, Delete, Get, GetAll } = require('../services/faq-services')



app.post('/', (req, res) => {

    if (!req.body.question || !req.body.answer) {
        return res.status(400).json({ success: false, msg: "Please provide question or answer" })
    }

    faq.question = req.body.question
    faq.answer = req.body.answer
    faq.createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    faq.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    Add(req, res, faq)
})

app.put('/:faqID', (req, res) => {                                                 //faq from database(get) and from api
    const { faqID } = req.params
    faq.question = req.body.question
    faq.answer = req.body.answer
    faq.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    Update(req, res, faq, faqID)
})

app.delete('/:faqID', (req, res) => {
    const { faqID } = req.params
    Delete(req, res, faqID)
})

app.get('/:faqID', (req, res) => {
    const { faqID } = req.params
    Get(req, res, faqID)
})

app.get('/', GetAll)

module.exports = app