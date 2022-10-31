const Nhanvien = require("../models/nhanvien.model");
const jwt = require("jsonwebtoken");

exports.checkLogin = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'secret');
        if(!claims) {
            return res.status(200).json({ message: "unauthenticated", code: 0});
        }
        const user = await Nhanvien.findOne({_id: claims._id});
        if(user) { 
            next();
        }
    } catch (e) {
        return res.status(200).json({ message: "Chưa đăng nhập", code: 0});
    }
}