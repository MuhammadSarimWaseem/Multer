const mongoose = require('mongoose')

mongoose
    .connect("mongodb://localhost:27017/multer")
    .then(() => { console.log("Mongo connected") })
    .catch(() => { console.log("Connection error") })


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }
})

const courseModel = new mongoose.model("course", courseSchema)

module.exports = courseModel