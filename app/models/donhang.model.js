const mongoose = require("mongoose");

const donHangSchema = new mongoose.Schema({
    taikhoan: {
        type: String,
        ref: "Khachhang",
    },
    hoten: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    ghichu: {
        type: String,
    },
    tongtien: {
        type: Number,
    },
    trangthai: {
        type: String,
        default: 'Chưa xử lý',
    },
    nguoixuly: {
        type: String,
        ref: "Nhanvien",
    },
    shipper: {
        type: String,
        ref: "Nhanvien",
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Donhang", donHangSchema);