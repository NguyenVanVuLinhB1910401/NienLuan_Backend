const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shipperController = require("../controllers/shipper.controller");
const middlewares = require("../middlewares/checkLogin");
// const path = require("path");
// const multer = require("multer");

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../uploads"));
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.hoten +"_"+ Date.now()+"_" + file.originalname);
//     }
// })
// const upload = multer({ storage: fileStorage});


router.post("/nv/themshipper", shipperController.createShipper);
router.delete('/nv/shipper/:id', shipperController.deleteOneShipper);
router.get('/nv/shippers', shipperController.getAllShipper);
router.get('/nv/shipper/donhang', shipperController.getAllDonHang);
router.get('/nv/shipper/donhangdanggiao/:id', shipperController.getAllDonHangDangGiao);
router.get('/nv/shipper/donhangdagiao/:id', shipperController.getAllDonHangDaGiao);
router.put('/nv/shipper/nhandon/:id', shipperController.nhanDon);
module.exports = router; 