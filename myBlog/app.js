require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDb = require("./config/db");

connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});





const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(methodOverride("_method"));

app.use("/", require("./routes/postRouter"));
app.use("/", require("./routes/adminRouter"));