const ApiError = require("../api-error");
const Loai = require("../models/loai.model");
const fs = require("fs");
const path = require("path");
exports.getAllCategory = async (req, res) => {

    try {
        const loai = await Loai.find();
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, loai});
    } catch (err) {
        return res.status(200).json({message: err.message, code: 0});
    }
};

exports.getOneCategory = async (req, res) => {

    try {
        const loai = await Loai.findById(req.params.id);
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1,loai: loai});
    } catch (err) {
        return res.status(404).json({message: err.message, code: 0});
    }
};

exports.addCategory = async (req, res) => {
    const loai = req.body;
    //console.log(loai);
    loai.image = req.file?.filename;
    
    try {
        //console.log(loai.tenloaisp);
        const checkLoai = await Loai.find({tenloaisp: loai.tenloaisp});
        if(checkLoai.length > 0) {
            // console.log(checkLoai);
            // console.log(path.join(__dirname, "../uploads/" + loai.image));
            fs.unlinkSync(path.join(__dirname, "../uploads/" + loai.image));
            return res.status(200).json({message: "Tên loại đã được sử dụng", code: 0});
        } 
        const category = await Loai.create(loai);
        return res.status(200).json({message: "Thêm loại sản phẩm thành công", code: 1,category});
    } catch (err) {
        console.log(err);
        return res.status(200).json({message: "Thêm sản phẩm thất bại", code: 0});
    }
};

exports.updateCategory = async (req, res) => {
    const id = req.params.id;
    // console.log(req.body);
    //console.log(id);
    let new_image = "";
    if(req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync(path.join(__dirname, "../uploads/" + req.body.old_image));
        } catch (error) {
            console.log(error);
        }
    }else {
        new_image = req.body.old_image;
    }
    const newCategory = req.body;
    newCategory.image = new_image;
    try {
        await Loai.findByIdAndUpdate(id, newCategory);
        return res.status(200).json({message: "Update thành công", code: 1});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    //return res.status(200).json({message: "update category"});
};

exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        loai = await Loai.findById(id);
        fs.unlinkSync(path.join(__dirname, "../uploads/" + loai.image));
        await Loai.deleteOne({_id: id});
        const category = await  Loai.find();
        return res.status(200).json({message: "Xóa thành công", code: 1, category});
    } catch (error) {
        return res.status(404).json({message: error.message, code: 0});
    }
    
};

