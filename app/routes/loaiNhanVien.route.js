const express = require("express");
const router = express.Router();
const loaiNhanVienController = require("../controllers/loaiNhanVien.cotroller");
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
router.get("/nv/loaisp", loaiNhanVienController.getAllCategory);
router.get("/nv/loaisp/:id", loaiNhanVienController.getOneCategory);
router.post("/nv/loaisp/add", upload.single("image"), loaiNhanVienController.addCategory);
router.put("/nv/loaisp/:id", upload.single("image"), loaiNhanVienController.updateCategory);
router.delete("/nv/loaisp/:id", loaiNhanVienController.deleteCategory);


module.exports = router;