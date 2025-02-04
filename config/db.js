require('dotenv').config()
const mongoose = require('mongoose')

let db = mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => { console.log("Mongo connected") })
    .catch(() => { console.log("Connection error") })


module.exports = db