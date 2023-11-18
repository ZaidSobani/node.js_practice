const db = require('./database/database')

class FaqServices {
    constructor(faq, faqID) {
        this.faq = faq
        this.faqID = faqID

    }

    Add() {
        if (this.faq.published === true) {
            db.query('INSERT INTO faq (question,answer,created_date_time,last_updated_date_time) VALUES(?,?,?,?)',
                [this.faq.question, this.faq.answer, this.faq.createdDate, this.faq.updatedDate], (err, result) => {
                    if (err) throw err
                    console.log('Inserted into faq table')
                    this.faq.id = result.insertId
                })
        }
        else {
            console.log('please publish')
        }
    }

    Update() {
        if (this.faq.published === true) {
            db.query('UPDATE faq SET question=COALESCE(NULLIF(?,""),question),answer=COALESCE(NULLIF(?,""),answer),last_updated_date_time=? WHERE id=?',
                [this.faq.question, this.faq.answer, this.faq.updatedDate, this.faqID], (err, result) => {
                    if (err) throw err
        
                })
        }
        else {
            console.log('please publish')
        }
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










//----------------------------------------------------------------------------------------------------------------

// const db = require('./database/database')



// const Add = (faq) => {
//     db.query('INSERT INTO faq (question,answer,created_date_time,last_updated_date_time) VALUES(?,?,?,?)',
//         [faq.question, faq.answer, faq.createdDate, faq.updatedDate], (err, result) => {
//             if (err) throw err
//             console.log('Inserted into faq table')
//             faq.id = result.insertId
//         })
// }

// const Update = (faq, faqID) => {
//     db.query('UPDATE faq SET question=COALESCE(NULLIF(?,""),question),answer=COALESCE(NULLIF(?,""),answer),last_updated_date_time=? WHERE id=?',
//         [faq.question, faq.answer, faq.updatedDate, faqID], (err, result) => {
//             if (err) throw err

//         })
// }

// const Delete = (faqID) => {
//     db.query('DELETE FROM faq WHERE id=?', [faqID], (err, result) => {
//         if (err) throw err

//     })
// }

// const Get = (faqID) => {
//     db.query('SELECT * FROM faq WHERE id=?', [faqID], (err, result) => {
//         if (err) throw err

//         // const resultAfter = JSON.parse(JSON.stringify(result))
//         // console.log(resultAfter[0].question)
//     })
// }

// const GetAll = () => {
//     db.query('SELECT * FROM faq', (err, result) => {
//         if (err) throw err

//     })
// }




// module.exports = {
//     Add, Update, Delete, Get, GetAll
// }