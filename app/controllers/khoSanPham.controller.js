const ApiError = require("../api-error");
const Kho = require("../models/kho.model");
const fs = require("fs");
const path = require("path");
exports.getAllKhoSanPham = async (req, res) => {
    //return res.status(200).json({message: "Succcess", code: 1});
    try {
        const kho = await Kho.find().populate('id_sp').populate('id_ncc');
        return res.status(200).json({message: "Succcess", code: 1, kho: kho});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }
};

exports.getOneKhoSanPham = async (req, res) => {
    try {
        const kho = await Kho.findById(req.params.id);
        return res.status(200).json({message: "Succcess", code: 1,kho: kho});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }
};

exports.addNhapKho = async (req, res) => {
    const sp = req.body;
    //console.log(sp);
    sp.tongtien = parseInt(req.body.soluong)  * parseInt(req.body.gianhap);
    const findSP = await Kho.findOne({id_sp: sp.id_sp});
    //console.log(findSP);
    if(findSP){
        sp.soluong = parseInt(findSP.soluong) + parseInt(req.body.soluong);
        sp.tongtien += parseInt(findSP.tongtien);
        const result = await Kho.findOneAndUpdate({id_sp: req.body.id_sp}, sp);
        return res.status(200).json({message: "Nhập kho thành công", code: 1, sp: result});
    }else{
        //console.log("Tìm ko thấy");
        try {
            const result = await Kho.create(sp);
            console.log(result);
            return res.status(200).json({message: "Nhập kho thành công", code: 1, sp: result});
        } catch (err) {
            console.log(err);
            return res.status(404).json({message: "Nhập kho thất bại", code: 0});
        }
    }
};

exports.updateNhapKho = async (req, res) => {
    const id = req.params.id;
    // console.log(req.body);
    //console.log(id);
    //let new_image = "";
    // if(req.file) {
    //     new_image = req.file.filename;
    //     try {
    //         fs.unlinkSync(path.join(__dirname, "../uploads/" + req.body.old_image));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }else {
    //     new_image = req.body.old_image;
    // }
    const newNhapKho = req.body;
    newNhapKho.tongtien = parseInt(req.body.soluong)  * parseInt(req.body.gianhap);
    //newCategory.image = new_image;
    try {
        await Kho.findByIdAndUpdate(id, newNhapKho);
        return res.status(200).json({message: "Update thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "update category"});
};

exports.deleteNhapKho = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Kho.deleteOne({_id: id});
        const kho = await  Kho.find();
        return res.status(200).json({message: "Xóa thành công", code: 1, kho: kho});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    
};

