const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs"); // ejs 템플릿 사용 설정정
app.set("views", "./views");

dbConnect();

app.get("/", (req, res)=>{
    res.send('Hello, Node!');
});

// 미들웨어 등록
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/contacts", require("./routes/contactRoutes"));
app.use('/public', express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('서버 실행 중');
});