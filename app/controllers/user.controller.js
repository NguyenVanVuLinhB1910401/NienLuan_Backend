
const ApiError = require("../api-error");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
//Tao va save mot contact moi
exports.register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword
    });
    const result = await user.save();
    const {password, ...data} = await result.toJSON();
    return res.status(200).json({data});
    
};

exports.create = (req, res) => {
    console.log(req.files.image.name);
    console.log(req.body.name);
    res.send(req.files.image);
};

exports.findAll = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({users})

};

exports.update = (req, res) => {
    res.send({ message: "update handle" });
};

exports.delete = (req, res) => {
    res.send({ message: "delete handle" });
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handle" });
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handle" });
};