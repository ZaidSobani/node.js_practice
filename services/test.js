const db = require('./database/database')

class FaqServices {
    constructor(faq, faqID) {
        this.faq = faq
        this.faqID = faqID

    }

    Add() {
        db.query('INSERT INTO faq (question,answer,created_date_time,last_updated_date_time) VALUES(?,?,?,?)',
            [this.faq.question, this.faq.answer, this.faq.createdDate, this.faq.updatedDate], (err, result) => {
                if (err) throw err
                console.log('Inserted into faq table')
                this.faq.id = result.insertId
            })
    }

    Update() {
        db.query('UPDATE faq SET question=COALESCE(NULLIF(?,""),question),answer=COALESCE(NULLIF(?,""),answer),last_updated_date_time=? WHERE id=?',
            [this.faq.question, this.faq.answer, this.faq.updatedDate, this.faqID], (err, result) => {
                if (err) throw err

            })
    }

    Delete() {
        db.query('DELETE FROM faq WHERE id=?', [this.faqID], (err, result) => {
            if (err) throw err

        })
    }

    Get() {
        db.query('SELECT * FROM faq WHERE id=?', [this.faqID], (err, result) => {
            if (err) throw err
            console.log(result)
            // const resultAfter = JSON.parse(JSON.stringify(result))
            // console.log(resultAfter[0].question)
        })
    }

    GetAll() {
        db.query('SELECT * FROM faq', (err, result) => {
            if (err) throw err
            console.log(result)

        })
    }
}

module.exports = FaqServices



