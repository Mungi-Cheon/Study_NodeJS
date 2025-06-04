require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDb = require("./config/db");

connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

app.use("/", require("./routes/main"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});