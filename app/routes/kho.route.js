const express = require("express");
const router = express.Router();
const khoController = require("../controllers/khoSanPham.controller");
const path = require("path");
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "_" + file.originalname)
    }
})
const upload = multer({ storage: fileStorage});
router.get("/khosp", khoController.getAllKhoSanPham);
router.get("/khosp/:id", khoController.getOneKhoSanPham);
router.post("/khosp", upload.single("image"), khoController.addNhapKho);
router.put("/khosp/:id", upload.single("image"), khoController.updateNhapKho);
router.delete("/khosp/:id", khoController.deleteNhapKho);


module.exports = router;