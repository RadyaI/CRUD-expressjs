const sql = require('mysql')

const DB = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_laravel9"
})

module.exports = DB