const express = require("express");
const router = express.Router();
const productNhanVienController = require("../controllers/productNhanVien.controller");
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
router.get("/products", productNhanVienController.getAllProduct);
router.get("/products/:id", productNhanVienController.getOneProduct);
router.post("/products/add", upload.single("image"), productNhanVienController.addProduct);
router.put("/products/:id", upload.single("image"), productNhanVienController.updateProduct);
router.delete("/products/:id", productNhanVienController.deleteProduct);


module.exports = router;