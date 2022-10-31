const mongoose = require("mongoose");

const nhaCungCapSchema = new mongoose.Schema({
    ten: {
        type: String,
        
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("NhaCungCap", nhaCungCapSchema);