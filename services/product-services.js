const db = require('./database/database')



const Add = (req, res, product) => {
    db.query('INSERT INTO products (name,price,discount_price,created_date_time,last_updated_date_time,category_id) VALUES (?,?,?,?,?,?)',
        [product.producrName, product.price, product.discountPrice, product.createdDate, product.updatedDate,
        product.categoryId], (err, result) => {
            if (err) throw err
            product.id = result.insertId
            res.status(201).json({ success: true, msg: `Product with id= ${product.id} is added` })
        })
}

const Update = (req, res, product, ProductID) => {
    db.query('UPDATE products SET name=COALESCE(NULLIF(?,""),name),price=COALESCE(NULLIF(?,""),price),discount_price=COALESCE(NULLIF(?,""),discount_price),last_updated_date_time=? WHERE id=?',
        [product.producrName, product.price, product.discountPrice, product.updatedDate, ProductID], (err, result) => {
            if (err) throw err
            if (result.affectedRows == 0) {
                return res.status(400).json({ success: false, msg: "recored not founded" })
            }

            if (product.producrName || product.price || product.discountPrice) {
                return res.status(201).json({ success: true, msg: `The record with id= ${ProductID} has been updated` })
            }
            else {
                return res.status(400).json({ success: false, msg: 'Please change data in record' })
            }
        })
}

const Delete = (req, res, ProductID) => {
    db.query('DELETE FROM products WHERE id=?', [ProductID], (err, result) => {
        if (err) throw err
        if (result.affectedRows == 0) {
            return res.status(400).json({ success: false, msg: "recored not founded" })
        }
        res.status(201).json({ success: true, msg: `The record with id= ${ProductID} has been deleted` })
    })
}

const Get = (req, res, ProductID) => {
    db.query('SELECT * FROM products WHERE id=?', [ProductID], (err, result) => {
        if (err) throw err
        if (result.length == 0) {
            return res.status(400).json({ success: false, msg: "record not founded" })
        }
        else {
            res.status(201).json({ success: true, data: result })
        }
    })
}

const GetAll = (req, res) => {
    db.query('SELECT * FROM products', (err, result) => {
        if (err) throw err
        res.status(201).json({ success: true, data: result })
    })
}




module.exports = {
    Add, Update, Delete, Get, GetAll
}