const ApiError = require("../api-error");
const Donhang = require("../models/donhang.model");
const Chitietdonhang = require("../models/chitietdonhang.model");
// const fs = require("fs");
// const path = require("path");
exports.getAllDonHang = async (req, res) => {

    try {
        const donhang = await Donhang.find();
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, donhang: donhang});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};
exports.getAllDonHangChuaXuLy = async (req, res) => {

    try {
        const donhang = await Donhang.find({trangthai: "Chưa xử lý"});
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, donhang: donhang});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};
exports.getAllDonHangDaXuLy = async (req, res) => {

    try {
        const donhang = await Donhang.find({trangthai: "Đã xử lý"});
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, donhang: donhang});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};
exports.getAllDonHangDangGiaoHang = async (req, res) => {

    try {
        const donhang = await Donhang.find({trangthai: "Đang giao hàng"});
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, donhang: donhang});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};
exports.getAllDonHangDaGiaoHang = async (req, res) => {

    try {
        const donhang = await Donhang.find({trangthai: "Đã hoàn thành"});
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, donhang: donhang});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};

exports.getDetailDonHang = async (req, res) => {

    try {
        const thongtindathang = await Donhang.findById(req.params.id).populate('shipper');
        const giohang = await Chitietdonhang.find({id_dh: req.params.id}).populate('id_sp'); 
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1,thongtindathang: thongtindathang, giohang: giohang});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }
};

exports.updateTrangThai = async (req, res) => {
    //const cart = req.body;   
    //console.log(cart);
    const id = req.params.id;
    try {
        const updateDH = await Donhang.findByIdAndUpdate(id, req.body);
        //console.log(find);
        const donhang = await Donhang.find();
        return res.status(200).json({message: "Update thành công", code: 1, donhang: donhang});
        
        //return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Update thất bại", code: 0});
    }
};

// exports.updateNhaCungCap = async (req, res) => {
//     const id = req.params.id;
//     // console.log(req.body);
//     //console.log(id);
//     //let new_image = "";
//     // if(req.file) {
//     //     new_image = req.file.filename;
//     //     try {
//     //         fs.unlinkSync(path.join(__dirname, "../uploads/" + req.body.old_image));
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }else {
//     //     new_image = req.body.old_image;
//     // }
//     const newNhaCungCap = req.body;
//     //newCategory.image = new_image;
//     try {
//         await NhaCungCap.findByIdAndUpdate(id, newNhaCungCap);
//         return res.status(200).json({message: "Update thành công", code: 1});
//     } catch (error) {
//         return res.status(404).json({message: error.message, code: 0});
//     }
//     //return res.status(200).json({message: "update category"});
// };

exports.deleteCartItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Cart.deleteOne({_id: id});
        return res.status(200).json({message: "Xóa thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    
};




