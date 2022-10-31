const ApiError = require("../api-error");
const Donhang = require("../models/donhang.model");
const Kho = require("../models/kho.model");
const Chitietdonhang = require("../models/chitietdonhang.model");
const Cart = require("../models/cart.model");
const fs = require("fs");
const path = require("path");
exports.thanhToan = async (req, res) => {
    //console.log(req.body.donhang);
    //console.log(req.body.yourcart);
    if(req.body?.donhang && req.body?.yourcart){
        // try {
            const donhang = new Donhang(req.body.donhang);
            //console.log(donhang)
             const chitietdonhang = req.body.yourcart;
            const ctdh= [];
            const slDaBan = [];
            //Kiem tra hang trong kho
            for(let i = 0; i < chitietdonhang.length; i++){
                //console.log(1+i);
                try {
                    const spKho = await Kho.findOne({id_sp: chitietdonhang[i].id_sp._id}).populate('id_sp');
                    slDaBan[i] = spKho.daban; 
                    if(spKho.daban < spKho.soluong){
                        const checkTonKho = parseInt(spKho.daban) + parseInt(chitietdonhang[i].soluong);
                        if(checkTonKho > parseInt(spKho.soluong)){
                            return res.status(200).json({ message: "Sản phẩm"+ spKho.id_sp.tensp +" hết hàng", code: 0})
                        }else{
                            ctdh[i] = {
                                id_dh: donhang._id,
                                id_sp: chitietdonhang[i].id_sp._id,
                                soluong: chitietdonhang[i].soluong,
                                gia: chitietdonhang[i].id_sp.giakm,
                                thanhtien: parseInt(chitietdonhang[i].soluong) * parseInt(chitietdonhang[i].id_sp.giakm)
                            }
                        }
                    }
                } catch (error) {
                    return res.status(400).json({ message: error.message, code: 0})
                }
            }

            try {
                await  Chitietdonhang.insertMany(ctdh);
                donhang.save();
                //Cập nhật lại số lượng của sản phẩm trong kho
                for(let i = 0; i < chitietdonhang.length; i++){
                    try {
                        const sp  = await Kho.findOneAndUpdate({id_sp: chitietdonhang[i].id_sp._id}, {
                            daban: parseInt(slDaBan[i]) + parseInt(chitietdonhang[i].soluong)
                        })
                    } catch (error) {
                        return res.status(400).json({ message: error.message, code: 0}) 
                    }
                }
                //Xóa sản phẩm đã đặt hàng thành công trong giỏ hàng
                for(let i =0; i < chitietdonhang.length; i++){
                    try {
                        await Cart.deleteOne({id_sp: chitietdonhang[i].id_sp._id, taikhoan: donhang.taikhoan})
                    } catch (error) {
                        return res.status(400).json({ message: error.message, code: 0})
                    }
                }
                
                return res.status(200).json({ message: "Đặt hàng thành công", code: 1})
            } catch (error) {
                return res.status(400).json({ message: error.message, code: 0})
            }     
    }
    return res.status(200).json({message: "Không có dữ liệu", code: 1});
};

exports.lichSuDatHang = async (req, res) => {
    try {
        //console.log(req.params.id)
        const dh = await Donhang.find({taikhoan: req.params.id});
        //const data = products;
        return res.status(200).json({message: "Succcess", code: 1, donhang: dh});
    } catch (err) {
        return res.status(401).json({message: err.message, code: 0});
    }
}

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

exports.huyDonHang = async (req, res) => {
    const cart = req.body.giohang;
    //console.log(cart)
    const id = req.body.id;   
    try {
        //Cập nhật lại số lượng của sản phẩm trong kho
        for(let i = 0; i < cart.length; i++){
            try {
                const kho = await Kho.findOne({id_sp: cart[i].id_sp._id});
                const sp  = await Kho.findOneAndUpdate({id_sp: cart[i].id_sp._id}, {
                    daban: parseInt(kho.daban) - parseInt(cart[i].soluong)
                })
            } catch (error) {
                return res.status(400).json({ message: error.message, code: 0}) 
            }
        }

        const updateDH = await Donhang.findByIdAndUpdate(id,{trangthai: 'Đã hủy'});
        //console.log(find);
        const donhang = await Donhang.find();
        return res.status(200).json({message: "Update thành công", code: 1, donhang: donhang});
        
        //return res.status(200).json({message: "Add to cart thành công", code: 1, sp: document});
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Update thất bại", code: 0});
    }
};
