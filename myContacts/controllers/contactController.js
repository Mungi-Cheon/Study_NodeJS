const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
});

// Post /contacts
const addContacts = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        return res.send("필수 값이 입력되지 않았습니다");
    }

    const contact = await Contact.create({
        name, email, phone
    });
    res.send("Create Contacts");
});

// Get contact /contact/id
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    res.send(contacts);
});

// Update contact /contact/id
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {name, email, phone} = req.body;
    const contact = await Contact.findById(id);
    if(!contact){
        throw new Error("Contact not found");
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.save();

    res.json(contact);
});

// Delete contact /contact/id
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);

    if (!contact) {
        throw new Error("Contact not found.");
    }

    await contact.deleteOne();
    res.send("Deleted");
});

module.exports = {getAllContacts, addContacts, getContacts, updateContact, deleteContact};