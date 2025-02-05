const express = require("express");
const multerRoutes = require("./Routes/multer");
const testRoutes = require("./Routes/test");
require("dotenv").config();
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT;

app.use(multerRoutes);
app.use(testRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));