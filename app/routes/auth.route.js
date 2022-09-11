const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth");
const middlewares = require("../middlewares/checkLogin");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

router.post("/upload", authController.logout);

router.get("/user", middlewares.checkLogin, authController.getUser);


module.exports = router;