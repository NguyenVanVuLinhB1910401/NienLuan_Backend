const ApiError = require("../api-error");
const Cart = require("../models/cart.model");
// const fs = require("fs");
// const path = require("path");
exports.getCart = async (req, res) => {

    try {
        const cart = await Cart.find({taikhoan: req.params.taikhoan}).populate('id_sp');
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, cart: cart});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
};

// exports.getOneNhaCungCap = async (req, res) => {

//     try {
//         const ncc = await NhaCungCap.findById(req.params.id);
//         //const data = products;
//         return res.status(200).json({message: "Succcess", code: 1,ncc: ncc});
//     } catch (err) {
//         return res.status(404).json({message: err.message, code: 0});
//     }
// };

exports.addCart = async (req, res) => {
    const cart = req.body;   
    //console.log(cart);
    try {
        const find = await Cart.findOne({id_sp: cart.id_sp, taikhoan: cart.taikhoan});
        //console.log(find);
        if(find){
            if(cart.soluong == undefined){
                cart.soluong = parseInt(find.soluong) + 1;
            }
            cart.soluong = parseInt(find.soluong) + cart.soluong;
            //console.log("Đã có trong giỏ hàng: "+ cart.soluong);
            const result = await Cart.findByIdAndUpdate(find._id, cart);
            const document = await Cart.find({taikhoan: cart.taikhoan});
            return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
        }else{
            //console.log(cart.soluong);
            if(cart.soluong == undefined){
                cart.soluong = 1;
            }
            
            //console.log("Không có trong giỏ hàng:" + cart.soluong);
            const result = await Cart.create(cart);
            const document = await Cart.find({taikhoan: cart.taikhoan});
            return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
        }
        //return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Add to cart thất bại", code: 0});
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




