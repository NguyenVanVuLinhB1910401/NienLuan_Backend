const mongoose = require("mongoose");

const chiTietDonHangSchema = new mongoose.Schema({
    id_dh: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
        
    },
    id_sp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sanpham",
        
    },
    soluong: {
        type: Number,
    },
    gia: {
        type: Number,
    },
    thanhtien: {
        type: Number,
    }
});

module.exports = mongoose.model("Chitietdonhang", chiTietDonHangSchema);