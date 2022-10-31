const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id_sp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sanpham"
    },
    taikhoan: {
        type: String,
        ref: "Khachhang"
    },
    soluong: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Cart", cartSchema);