const express = require("express");
const router = express.Router()
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const courseModel = require("../Models/course");
require('dotenv').config()

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
router.use(express.json());

// Route to create course
router.post("/multer", upload.single("image"), async (req, res) => {
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

module.exports = router