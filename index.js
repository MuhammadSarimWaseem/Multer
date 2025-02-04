const express = require("express");
const router = require("./Routes/Multer");
require('dotenv').config()
const db = require("./config/db")

const app = express();
const PORT = process.env.PORT;


app.use(router)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
