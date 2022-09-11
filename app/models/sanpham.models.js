const mongoose = require("mongoose");

const sanphamSchema = new mongoose.Schema({
    _masp: {
        type: mongoose.Schema.Types.ObjectId,
    },
    tensp: {
        type: String,
        
    },
    image: {
        type: String,
    },
    maloaisp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loaisanpham",
    },
    email: {
        type: String,
        unique: true,
        
    },
    password: {
        type: String, 
    },
    isAdmin: {
        type: Boolean,
        default: 0
    }
});

module.exports = mongoose.model("Sanpham", sanphamSchema);