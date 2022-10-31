const express = require("express");
const router = express.Router();
const orderNhanVienController = require("../controllers/orderNhanVien.controller");

router.get("/nhanvien/order", orderNhanVienController.getAllDonHang);
router.get("/nhanvien/order/chuaxuly", orderNhanVienController.getAllDonHangChuaXuLy);
router.get("/nhanvien/order/daxuly", orderNhanVienController.getAllDonHangDaXuLy);
router.get("/nhanvien/order/danggiaohang", orderNhanVienController.getAllDonHangDangGiaoHang);
router.get("/nhanvien/order/dagiaohang", orderNhanVienController.getAllDonHangDaGiaoHang);
router.get("/nhanvien/order/:id", orderNhanVienController.getDetailDonHang);
router.put("/nhanvien/order/:id", orderNhanVienController.updateTrangThai);
// router.post("/nhacungcap", upload.single("image"), nhaCungCapController.addNhaCungCap);
// router.put("/nhacungcap/:id", upload.single("image"), nhaCungCapController.updateNhaCungCap);
// router.delete("/nhacungcap/:id", nhaCungCapController.deleteNhaCungCap);


module.exports = router;