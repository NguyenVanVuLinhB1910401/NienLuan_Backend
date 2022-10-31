const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authKhachHangController = require("../controllers/authKhachHang.controller");
const middlewares = require("../middlewares/checkLogin");
const path = require("path");
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


router.post("/khachhang/register", authKhachHangController.register);
router.post("/khachhang/login", authKhachHangController.login);
router.post('/khachhang/logout', authKhachHangController.logout);
router.get('/khachhang/user', authKhachHangController.getKhachHang);

module.exports = router; 