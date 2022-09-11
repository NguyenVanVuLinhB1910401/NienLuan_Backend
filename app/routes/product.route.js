const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");
const path = require("path");
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: fileStorage});

router.get("/products", product.getAllProduct)
router.post("/products/add", upload.single("image"), product.addProduct);



module.exports = router;