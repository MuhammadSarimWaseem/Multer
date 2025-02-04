const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const courseModel = require("./Models/course");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

// Ensure upload directory exists
const uploadDir = "./public/uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage setup
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Middleware
app.use(express.json());

// Route to create course
app.post("/createCourse", upload.single("image"), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price) return res.status(400).json({ message: "Missing fields" });

        const course = await courseModel.create({
            title,
            description,
            price,
            image: req.file?.filename || null,
        });

        res.status(201).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
