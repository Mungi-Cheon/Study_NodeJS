const express = require("express");
const router = express.Router();

// Router를 사용하면 아래와 같이 메서드 get, post, put, delete를
// 체이닝 해서 관리할 수 있다. 
// 또한, endpoint를 "/"로 지정한 뒤 모듈화 해두면
// 해당 모듈을 호출하는 스크립트에서 endpoint를 지정하는 것만으로
// endpoint 변경이 용이해진다.
router
    .route("/")
    .get((req, res)=>{
        res.send("Contacts Page");
    })
    .post((req,res)=>{
        res.send("Create Contacts");
    });

router
    .route("/:id")
        .get((req, res)=>{
            res.send(`View Contact for ID : ${req.params.id}`);
        })
        .put((req,res)=>{
            res.send(`Update Contact for ID : ${req.params.id}`);
        })
        .delete((req,res)=>{
            res.send(`Delete Contact for ID : ${req.params.id}`);
        });

module.exports = router;