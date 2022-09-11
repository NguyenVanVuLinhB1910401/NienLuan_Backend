const mongoose = require("mongoose");

const nhanvienSchema = new mongoose.Schema({
    hoten: {
        type: String,
        
    },
    image: {
        type: String,
    },
    taikhoan: {
        type: String,
        unipue: true
    },
    matkhau: {
        type: String,
        
    },
    email: {
        type: String, 
    },
    sdt: {
        type: String, 
    },
    diachi: {
        type: String, 
    },
    role: {
        type: String, 
    },
    maquyen: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quyen'
    }]
});

module.exports = mongoose.model("Nhanvien", nhanvienSchema);