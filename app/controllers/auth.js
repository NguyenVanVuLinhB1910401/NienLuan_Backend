const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    const result = await user.save();
    const {password, ...data} = await result.toJSON();
    return res.status(200).json({data});
}

exports.login = async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return res.status(404).json({ message: "User not found"});
    }

    if(!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ message: "Invalid credentials"});
    }
    
    const token = jwt.sign({_id: user._id}, "secret")
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24*60*60*1000 // 1 day
    });
    return res.status(200).json({message: "success"});
}

exports.getUser = async (req, res) => {
    // const users = await User.find();
    console.log(req.cookies["jwt"])
    console.log(req.headers);
    return res.status(200).json({ data: "succcess" });
}

exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "success"});
}