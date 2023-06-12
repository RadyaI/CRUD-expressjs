const sql = require('mysql')

const DB = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cuy_university"
})

module.exports = DB