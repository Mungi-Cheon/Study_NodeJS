const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs"); // ejs 템플릿 사용 설정정
app.set("views", "./views");

dbConnect();


// 미들웨어 등록
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", require("./routes/loginRoute")); // 로그인 관련
app.use("/contacts", require("./routes/contactRoutes")); // 연락처 관련
app.use('/public', express.static(__dirname + '/public')); // css

app.listen(3000, () => {
    console.log('서버 실행 중');
});