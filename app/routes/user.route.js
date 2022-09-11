const express = require("express");
const user = require("../controllers/user.controller");
const router = express.Router();



router.post("/register", user.register);
router.get("/users", user.findAll)
// router.post("/post", user.create);

module.exports = router;