const Nhanvien = require("../models/nhanvien.model");
const Donhang = require("../models/donhang.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.createShipper = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedMatkhau = await bcrypt.hash(req.body.matkhau, salt);
    const nhanvien = req.body;
    nhanvien.image = req.file?.filename;
    nhanvien.matkhau = hashedMatkhau;
    nhanvien.role = "Shipper";
    try{
        data = await Nhanvien.create(nhanvien);
        //console.log(data);
        return res.status(200).json({message: "Thêm shipper thành công", code: 1});
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: error.message});
    }
    
}
exports.getAllShipper = async (req, res) => {
    try {
        
        const shippers = await Nhanvien.find({role: "Shipper"});
        return res.status(200).json({ shippers: shippers, code: 1});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
exports.getAllDonHang = async (req, res) => {
    try {
        
        const dh = await Donhang.find({trangthai: "Đã xử lý"});
        return res.status(200).json({ dh: dh, code: 1});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
exports.getAllDonHangDangGiao = async (req, res) => {
    try {
        
        const dh = await Donhang.find({shipper: req.params.id, trangthai: "Đang giao hàng",});
        return res.status(200).json({ dh: dh, code: 1,  message: "Các đơn hàng đang giao"});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
exports.getAllDonHangDaGiao = async (req, res) => {
    try {
        const dh = await Donhang.find({trangthai: "Đã hoàn thành", shipper: req.params.id, });
        return res.status(200).json({dh: dh, code: 1, message: "Các đơn hàng đã giao"});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
exports.nhanDon = async (req, res) => {
    const id = req.params.id;
    try {
        const updateDH = await Donhang.findByIdAndUpdate(id, req.body);
        return res.status(200).json({message: "Nhận đơn thành công", code: 1,});
        
        //return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Nhận đơn thất bại", code: 0});
    }
};
exports.deleteOneShipper = async (req, res) => {
    const id = req.params.id;
    try {
        const shippers = await Nhanvien.deleteOne({_id: id});
        return res.status(200).json({ message: "Xóa thành công", shippers: shippers, code: 1});
    } catch (e) {
        return res.status(400).json({ message: e.message, code: 0});
    }
}
