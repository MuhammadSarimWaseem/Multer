const express = require("express");
const multerRoutes = require("./Routes/multer");
const testRoutes = require("./Routes/test"); // Correctly import the second route
require("dotenv").config();
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT;

app.use(multerRoutes); // Prefix for clarity
app.use(testRoutes); // Prefix for clarity

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
