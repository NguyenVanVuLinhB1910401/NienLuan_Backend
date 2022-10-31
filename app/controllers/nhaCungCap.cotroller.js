const ApiError = require("../api-error");
const NhaCungCap = require("../models/nhacungcap.model");
const fs = require("fs");
const path = require("path");
exports.getAllNhaCungCap = async (req, res) => {

    try {
        const ncc = await NhaCungCap.find();
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, ncc: ncc});
    } catch (err) {
        return res.status(200).json({message: err.message, code: 0});
    }
};

exports.getOneNhaCungCap = async (req, res) => {

    try {
        const ncc = await NhaCungCap.findById(req.params.id);
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1,ncc: ncc});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }
};

exports.addNhaCungCap = async (req, res) => {
    const ncc = req.body;
    //console.log(req.body);
    //loai.image = req.file?.filename;
    
    try {
        //console.log(loai.tenloaisp);
        //const checkLoai = await Loai.find({tenloaisp: loai.tenloaisp});
        //if(checkLoai.length > 0) {
            // console.log(checkLoai);
            // console.log(path.join(__dirname, "../uploads/" + loai.image));
            //fs.unlinkSync(path.join(__dirname, "../uploads/" + loai.image));
            //return res.status(200).json({message: "Tên loại đã được sử dụng", code: 0});
        //} 
        const result = await NhaCungCap.create(ncc);
        return res.status(200).json({message: "Thêm nhà cung cấp thành công", code: 1, ncc: result});
    } catch (err) {
        console.log(err);
        return res.status(200).json({message: "Thêm nhà cung cấp thất bại", code: 0});
    }
};

exports.updateNhaCungCap = async (req, res) => {
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
    const newNhaCungCap = req.body;
    //newCategory.image = new_image;
    try {
        await NhaCungCap.findByIdAndUpdate(id, newNhaCungCap);
        return res.status(200).json({message: "Update thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "update category"});
};

exports.deleteNhaCungCap = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await NhaCungCap.deleteOne({_id: id});
        const ncc = await  NhaCungCap.find();
        return res.status(200).json({message: "Xóa thành công", code: 1, ncc: ncc});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    
};

