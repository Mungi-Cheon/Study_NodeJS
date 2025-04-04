const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

dbConnect();

app.get("/", (req, res)=>{
    res.send('Hello, Node!');
});
app.use(express.json());
app.use(express.urlencoded({extended:true})); // line 10~11 미들웨어 등록
app.use("/contacts", require("./routes/contactRoutes"));

app.listen(3000, () => {
    console.log('서버 실행 중');
});