const express = require("express");
const router = express.Router();
const {
    getAllContacts,
    createContacts,
    getContacts,
    updateContact,
    deleteContact,
    addContactForm,
} = require("../controllers/contactController");

// Router를 사용하면 아래와 같이 메서드 get, post, put, delete를
// 체이닝 해서 관리할 수 있다. 
// 또한, endpoint를 "/"로 지정한 뒤 모듈화 해두면
// 해당 모듈을 호출하는 스크립트에서 endpoint를 지정하는 것만으로
// endpoint 변경이 용이해진다.
router.route("/").get(getAllContacts);
router.route("/add").get(addContactForm).post(createContacts);
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact);

module.exports = router;