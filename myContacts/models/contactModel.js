const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
        },
        email : {
            type : String,
        },
        phone : {
            type : String,
            required : [true, "전화번호는 입력 필수 항목입니다."]
        }
    },
    {
    timestamps : true
    }
);

// Schema -> Model
// mongoose.model(모델명, 스키마명)
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;