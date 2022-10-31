const mongoose = require("mongoose");

const loaiSchema = new mongoose.Schema({
    tenloaisp: {
        type: String,
        unipue: true,
    },
    image: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Loai", loaiSchema);