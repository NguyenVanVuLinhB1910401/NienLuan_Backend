const mongoose = require("mongoose");

const khoSchema = new mongoose.Schema({
    nguoinhap: {
        type: String,
    },
    soluong: {
        type: Number,
    },
    daban: {
        type: Number,
        default: 0,
    },
    gianhap: {
        type: Number,
    },
    tongtien: {
        type: Number
    },
    id_ncc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NhaCungCap"
    },
    id_sp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sanpham"
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Kho", khoSchema);