const mongoose = require("mongoose");
require("dotenv").config();

// async(), await으로 DB 연결을 비동기 처리
const dbConnect = async() =>{
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECT);
        console.log("DB Connected");
    }catch(err){
        console.log(err);
    }
}

module.exports = dbConnect;