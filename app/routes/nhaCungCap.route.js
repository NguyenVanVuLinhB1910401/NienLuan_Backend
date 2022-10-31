const express = require("express");
const router = express.Router();
const nhaCungCapController = require("../controllers/nhaCungCap.cotroller");
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
router.get("/nhacungcap", nhaCungCapController.getAllNhaCungCap);
router.get("/nhacungcap/:id", nhaCungCapController.getOneNhaCungCap);
router.post("/nhacungcap", upload.single("image"), nhaCungCapController.addNhaCungCap);
router.put("/nhacungcap/:id", upload.single("image"), nhaCungCapController.updateNhaCungCap);
router.delete("/nhacungcap/:id", nhaCungCapController.deleteNhaCungCap);


module.exports = router;