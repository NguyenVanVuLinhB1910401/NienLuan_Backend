const mongoose = require("mongoose");

const sanphamSchema = new mongoose.Schema({
    tensp: {
        type: String,
    },
    image: {
        type: String,
    },
    maloaisp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loai",
    },
    noibat: {
        type: String,
    },
    moi: {
        type: Number,
    },
    mota: {
        type: String,
    },
    xuatxu: {
        type: String,
    },
    docon: {
        type: Number,
    },
    dungtich: {
        type: Number,
    },
    giongnho: {
        type: String,
    },
    giaban: {
        type: Number,
    },
    giakm: {
        type: Number,
    },
    dangban: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Sanpham", sanphamSchema);