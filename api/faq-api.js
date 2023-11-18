const express = require('express')
const app = express()
const Faq = require('../services/models/faq')
const FaqServices = require('../services/faq-services')



app.post('/', (req, res) => {
    if (!req.body.question || !req.body.answer) {
        return res.status(400).json({ success: false, msg: "Please provide question or answer" })
    }
    const faq = new Faq()
    faq.question = req.body.question
    faq.answer = req.body.answer
    faq.published = req.body.publish
    faq.createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
    faq.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const faqService = new FaqServices(faq)
    faqService.Add(faq)
})

app.put('/:faqID', (req, res) => {                                    //faq from database(get) and from api
    const { faqID } = req.params
    const faq = new Faq()
    faq.question = req.body.question
    faq.answer = req.body.answer
    faq.published = req.body.publish
    faq.updatedDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const faqService = new FaqServices(faq, faqID)
    faqService.Update()
})

app.delete('/:faqID', (req, res) => {
    const { faqID } = req.params
    const faqService = new FaqServices(undefined, faqID)
    faqService.Delete()
})

app.get('/:faqID', (req, res) => {
    const { faqID } = req.params
    const faqService = new FaqServices(undefined, faqID)
    faqService.Get()
})

app.get('/', (req, res) => {
    const faqService = new FaqServices()
    faqService.GetAll()
})



module.exports = app