const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
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

module.exports = mongoose.model("User", userSchema);