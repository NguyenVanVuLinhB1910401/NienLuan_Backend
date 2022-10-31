const express = require("express");
const router = express.Router();
const thanhToanController = require("../controllers/thanhToan.controller");

router.post("/khachhang/thanhtoan", thanhToanController.thanhToan);
router.post("/khachhang/huydh", thanhToanController.huyDonHang);
router.get("/khachhang/lichsudathang/:id", thanhToanController.lichSuDatHang);
router.get("/khachhang/chitietdonhang/:id", thanhToanController.getDetailDonHang);
// router.post("/nhacungcap", upload.single("image"), nhaCungCapController.addNhaCungCap);
// router.put("/nhacungcap/:id", upload.single("image"), nhaCungCapController.updateNhaCungCap);
// router.delete("/nhacungcap/:id", nhaCungCapController.deleteNhaCungCap);


module.exports = router;