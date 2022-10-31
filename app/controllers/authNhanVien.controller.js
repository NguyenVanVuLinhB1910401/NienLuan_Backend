const Nhanvien = require("../models/nhanvien.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.createNhanVien = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedMatkhau = await bcrypt.hash(req.body.matkhau, salt);
    const nhanvien = req.body;
    nhanvien.image = req.file?.filename;
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
    return res.status(200).json({message: "Success",role: user.role, code: 1, taikhoan: user.taikhoan, sdt: user.sdt, id: user._id});
}

exports.getNhanVien = async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'secret');
        if(!claims) {
            return res.status(200).json({ message: "unauthenticated", code: 0});
        }
        const user = await Nhanvien.findOne({_id: claims._id});
        if(user) { 
            return res.status(200).json({message: "success", code: 1,role: user.role,taikhoan: user.taikhoan, sdt: user.sdt, id: user._id})
        }
    } catch (e) {
        return res.status(200).json({ message: "Chưa đăng nhập", code: 0});
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).json({ message: "success"});
}