const db = require('./database/database')

class ProductServices {
    constructor(product, productID, category) {
        this.product = product
        this.productID = productID
        this.category = category
    }

    Add() {
        db.query('INSERT INTO products (name,price,discount_price,created_date_time,last_updated_date_time,category_id) VALUES (?,?,?,?,?,?)',
            [this.product.productName, this.product.price, this.product.discountPrice, this.product.createdDate, this.product.updatedDate,
            this.product.categoryId], (err, result) => {
                if (err) throw err
                this.product.id = result.insertId
            })
    }

    Update() {
        db.query('UPDATE products SET name=COALESCE(NULLIF(?,""),name),price=COALESCE(NULLIF(?,""),price),discount_price=COALESCE(NULLIF(?,""),discount_price),last_updated_date_time=? WHERE id=?',
            [this.product.productName, this.product.price, this.product.discountPrice, this.product.updatedDate, this.productID], (err, result) => {
                if (err) throw err

            })
    }

    Delete() {
        db.query('DELETE FROM products WHERE id=?', [this.productID], (err, result) => {
            if (err) throw err

        })
    }

    Get(sendProduct) {
        db.query(`SELECT p.id as product_id, p.name as name , p.category_id as category_id, p.image as product_image, c.name as category_name, c.id as id FROM products as p
        INNER JOIN product_category as c ON p.category_id = c.id AND p.id=? `, [this.productID], (err, result, callback) => {
            if (err) throw err

            this.product.id = result[0].product_id
            this.product.productName = result[0].name
            this.product.categoryId = result[0].category_id
            this.category.id = result[0].id
            this.category.CategoryName = result[0].category_name
            this.product.category = { id: this.category.id, category_name: this.category.CategoryName }
            this.product.imageName = result[0].product_image

            const subsetOfProduct = pick(this.product, ['id', 'productName', 'categoryId', 'category', 'imageName'])

            function pick(data, keys) {
                let result = {};
                keys.forEach((key) => { result[key] = data[key] });
                return result;
            }

            sendProduct(subsetOfProduct)
        })
    }

    GetAll(sendProduct) {
        db.query(`SELECT p.id as product_id, p.name as name , p.category_id as category_id, p.image as product_image, c.name as category_name, c.id as id FROM products as p
        INNER JOIN product_category as c on p.category_id = c.id`, (err, result) => {
            if (err) throw err

            const productArray = []

            for (let i = 0; i < result.length; i++) {
                this.product.id = result[i].product_id
                this.product.productName = result[i].name
                this.product.categoryId = result[i].category_id
                this.category.id = result[i].id
                this.category.CategoryName = result[i].category_name
                this.product.category = { id: this.category.id, category_name: this.category.CategoryName }
                this.product.imageName = result[i].product_image

                const subsetOfProduct = pick(this.product, ['id', 'productName', 'categoryId', 'category', 'imageName'])
                productArray.push(subsetOfProduct)
            }

            // console.log(productArray)

            function pick(data, keys) {
                let result = {};
                keys.forEach((key) => { result[key] = data[key] });
                return result;
            }

            sendProduct(productArray)
        })
    }
}


module.exports = ProductServices







//-----------------------------------------------------------------------------------------------------------------------------------------------
// const Add = (req, res, product) => {
//     db.query('INSERT INTO products (name,price,discount_price,created_date_time,last_updated_date_time,category_id) VALUES (?,?,?,?,?,?)',
//         [product.producrName, product.price, product.discountPrice, product.createdDate, product.updatedDate,
//         product.categoryId], (err, result) => {
//             if (err) throw err
//             product.id = result.insertId
//             res.status(201).json({ success: true, msg: `Product with id= ${product.id} is added` })
//         })
// }

// const Update = (req, res, product, ProductID) => {
//     db.query('UPDATE products SET name=COALESCE(NULLIF(?,""),name),price=COALESCE(NULLIF(?,""),price),discount_price=COALESCE(NULLIF(?,""),discount_price),last_updated_date_time=? WHERE id=?',
//         [product.producrName, product.price, product.discountPrice, product.updatedDate, ProductID], (err, result) => {
//             if (err) throw err
//             if (result.affectedRows == 0) {
//                 return res.status(400).json({ success: false, msg: "recored not founded" })
//             }

//             if (product.producrName || product.price || product.discountPrice) {
//                 return res.status(201).json({ success: true, msg: `The record with id= ${ProductID} has been updated` })
//             }
//             else {
//                 return res.status(400).json({ success: false, msg: 'Please change data in record' })
//             }
//         })
// }

// const Delete = (req, res, ProductID) => {
//     db.query('DELETE FROM products WHERE id=?', [ProductID], (err, result) => {
//         if (err) throw err
//         if (result.affectedRows == 0) {
//             return res.status(400).json({ success: false, msg: "recored not founded" })
//         }
//         res.status(201).json({ success: true, msg: `The record with id= ${ProductID} has been deleted` })
//     })
// }

// const Get = (req, res, ProductID) => {
//     db.query('SELECT * FROM products WHERE id=?', [ProductID], (err, result) => {
//         if (err) throw err
//         if (result.length == 0) {
//             return res.status(400).json({ success: false, msg: "record not founded" })
//         }
//         else {
//             res.status(201).json({ success: true, data: result })
//         }
//     })
// }

// const GetAll = (req, res) => {
//     db.query('SELECT * FROM products', (err, result) => {
//         if (err) throw err
//         res.status(201).json({ success: true, data: result })
//     })
// }




// module.exports = {
//     Add, Update, Delete, Get, GetAll
// }