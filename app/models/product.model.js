const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    maSP: {
        type: String
    },
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    xuatXu: {
        type: String,
    },
    loaiVang: {
        type: String,
    },
    nongDo: {
        type: String,
    },
    dungTich: {
        type: String,
    },
    giongNho: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);