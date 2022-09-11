const Nhanvien = require("../models/nhanvien.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.createNhanVien = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedMatkhau = await bcrypt.hash(req.body.matkhau, salt);
    const nhanvien = req.body;
    nhanvien.image = req.file.filename;
    nhanvien.matkhau = hashedMatkhau;
    try{
        data = await Nhanvien.create(nhanvien);
        console.log(data);
    } catch (error) {
        return res.status(200).json({ message: error.message});
    }
    return res.status(200).json({message: "Success"});
}

exports.login = async (req, res) => {
    //console.log(req.body);
    
    const user = await Nhanvien.findOne({taikhoan: req.body.taikhoan});
    
    if(!user) {
        return res.status(200).json({ message: "Tài khoản không tồn tại", code: 0});
    }

    if(!await bcrypt.compare(req.body.matkhau, user.matkhau)) {
        return res.status(200).json({ message: "Sai mật khẩu", code: 0});
    }
    const token = jwt.sign({_id: user._id}, "secret")
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24*60*60*1000 // 1 day
    });
    return res.status(200).json({message: "Success",role: user.role, code: 1});
}

// exports.getUser = async (req, res) => {
//     // const users = await User.find();
//     console.log(req.cookies["jwt"])
//     console.log(req.headers);
//     return res.status(200).json({ data: "succcess" });
// }

// exports.logout = async (req, res) => {
//     res.clearCookie("jwt");
//     return res.status(200).json({ message: "success"});
// }