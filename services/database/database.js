const mysql = require('mysql')
const dbConfig = require('../../config/config.json')

const db = mysql.createConnection(dbConfig.database.connection)

db.connect((err) => {
    if (err) throw err
    console.log('My SQL connected')
})

module.exports = db