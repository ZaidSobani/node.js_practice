const db = require('./database/database')

class CategoryServices {
    constructor(category, categoryID) {
        this.category = category
        this.categoryID = categoryID
    }

    Add() {
        db.query('INSERT INTO product_category (name,created_date_time,last_updated_date_time) VALUES (?,?,?)',
            [this.category.CategoryName, this.category.createdDate, this.category.updatedDate], (err, result) => {
                if (err) throw err
                this.category.id = result.insertId
            })
    }

    Update() {
        db.query('UPDATE product_category SET name=?,last_updated_date_time=? WHERE id=?',
            [this.category.CategoryName, this.category.updatedDate, this.categoryID], (err, result) => {
                if (err) throw err

            })
    }

    Delete() {
        db.query('DELETE FROM product_category WHERE id=?', [this.categoryID], (err, result) => {
            if (err) throw err

        })
    }

    Get() {
        db.query('SELECT * FROM product_category WHERE id=?', [this.categoryID], (err, result) => {
            if (err) throw err
            console.log(result)
        })
    }

    GetAll() {
        db.query('SELECT * FROM product_category', (err, result) => {
            if (err) throw err
            console.log(result)
        })
    }
}


module.exports = CategoryServices




//------------------------------------------------------------------------------------------------------------------------
// const Add = (req, res, category) => {
//     db.query('INSERT INTO product_category (name,created_date_time,last_updated_date_time) VALUES (?,?,?)',
//         [category.CategoryName, category.createdDate, category.updatedDate], (err, result) => {
//             if (err) throw err
//             category.id = result.insertId
//             res.status(201).json({ success: true, msg: `Category with id= ${category.id} is added` })
//             console.log(category)
//         })
// }

// const Update = (req, res, category, CategoryID) => {
//     db.query('UPDATE product_category SET name=?,last_updated_date_time=? WHERE id=?',
//         [category.CategoryName, category.updatedDate, CategoryID], (err, result) => {
//             if (err) throw err
//             if (result.affectedRows == 0) {
//                 return res.status(400).json({ success: false, msg: "recored not founded" })
//             }
//             if (category.CategoryName) {
//                 res.status(201).json({ success: true, msg: `The record with id= ${CategoryID} has been updated` })
//             }
//         })
// }

// const Delete = (req, res, CategoryID) => {
//     db.query('DELETE FROM product_category WHERE id=?', [CategoryID], (err, result) => {
//         if (err) throw err
//         if (result.affectedRows == 0) {
//             return res.status(400).json({ success: false, msg: "recored not founded" })
//         }
//         res.status(201).json({ success: true, msg: `The record with id= ${CategoryID} has been deleted` })
//     })
// }

// const Get = (req, res, CategoryID) => {
//     db.query('SELECT * FROM product_category WHERE id=?', [CategoryID], (err, result) => {
//         if (err) throw err
//         if (result.length == 0) {
//             return res.status(400).json({ success: false, msg: "recored not founded" })
//         }
//         else {
//             res.status(201).json({ success: true, data: result })
//         }
//     })
// }

// const GetAll = (req, res) => {
//     db.query('SELECT * FROM product_category', (err, result) => {
//         if (err) throw err
//         res.status(201).json({ success: true, data: result })
//     })
// }

// module.exports = {
//     Add, Update, Delete, Get, GetAll
// }