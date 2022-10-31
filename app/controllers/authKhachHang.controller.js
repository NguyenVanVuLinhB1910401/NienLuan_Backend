const Khachhang = require("../models/khachhang.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedMatkhau = await bcrypt.hash(req.body.matkhau, salt);
    const khachhang = req.body;
    khachhang.matkhau = hashedMatkhau;
    try{
        const find = await Khachhang.findOne({taikhoan: req.body.taikhoan});
        if(find){
            return res.status(200).json({message: "Tài khoản đã tồn tại", code: 0});
        }
        data = await Khachhang.create(khachhang);
        //console.log(data);
        return res.status(200).json({message: "Đăng ký tài khoản thành công", code: 1});
    } catch (error) {
        return res.status(200).json({ message: error.message, code: 0});
    }
    
}

exports.login = async (req, res) => {
    
    const khachhang = await Khachhang.findOne({taikhoan: req.body.taikhoan});
    
    if(!khachhang) {
        return res.status(200).json({ message: "Tài khoản không tồn tại", code: 0});
    }

    if(!await bcrypt.compare(req.body.matkhau, khachhang.matkhau)) {
        return res.status(200).json({ message: "Sai mật khẩu", code: 0});
    }
    const token = jwt.sign({_id: khachhang._id}, "secret")
    res.cookie('khachhang', token, {
        httpOnly: true,
        maxAge: 24*60*60*1000 // 1 day
    });
    return res.status(200).json({message: "Success",code: 1, taikhoan: khachhang.taikhoan});
}

exports.getKhachHang = async (req, res) => {
    try {
        const cookie = req.cookies['khachhang'];
        const claims = jwt.verify(cookie, 'secret');
        if(!claims) {
            return res.status(200).json({ message: "unauthenticated", code: 0});
        }
        const user = await Khachhang.findOne({_id: claims._id});
        if(user) { 
            return res.status(200).json({message: "success", code: 1,role: user.role,taikhoan: user.taikhoan})
        }
    } catch (e) {
        return res.status(401).json({ message: "Chưa đăng nhập", code: 0});
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('khachhang');
    return res.status(200).json({ message: "success", code: 1});
}