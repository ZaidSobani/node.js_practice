const db = require('./database/database')



const Add = (req, res, faq) => {
    db.query('INSERT INTO faq (question,answer,created_date_time,last_updated_date_time) VALUES(?,?,?,?)',
        [faq.question, faq.answer, faq.createdDate, faq.updatedDate], (err, result) => {
            if (err) throw err
            console.log('Inserted into faq table')
            faq.id = result.insertId
            res.status(201).json({ success: true, msg: `record with id=${faq.id} is added` })
        })
}

const Update = (req, res, faq, faqID) => {
    db.query('UPDATE faq SET question=COALESCE(NULLIF(?,""),question),answer=COALESCE(NULLIF(?,""),answer),last_updated_date_time=? WHERE id=?',
        [faq.question, faq.answer, faq.updatedDate, faqID], (err, result) => {
            if (err) throw err
            if (result.affectedRows == 0) {
                return res.status(400).json({ success: false, msg: "recored not founded" })
            }
            res.status(201).json({ success: true, msg: `The record with id= ${faqID} has been updated` })
        })
}

const Delete = (req, res, faqID) => {
    db.query('DELETE FROM faq WHERE id=?', [faqID], (err, result) => {
        if (err) throw err
        if (result.affectedRows == 0) {
            return res.status(400).json({ success: false, msg: "recored not founded" })
        }
        res.status(201).json({ success: true, msg: `The record with id= ${faqID} has been deleted` })
    })
}

const Get = (req, res, faqID) => {
    db.query('SELECT * FROM faq WHERE id=?', [faqID], (err, result) => {
        if (err) throw err
        if (result.length == 0) {
            return res.status(400).json({ success: false, msg: "record not founded" })
        }
        else {
            // const resultAfter = JSON.parse(JSON.stringify(result))
            // console.log(resultAfter[0].question)

            res.status(201).json({ success: true, data: result })
        }
    })
}

const GetAll = (req, res) => {
    db.query('SELECT * FROM faq', (err, result) => {
        if (err) throw err
        res.status(201).json({ success: true, data: result })
    })
}




module.exports = {
    Add, Update, Delete, Get, GetAll
}