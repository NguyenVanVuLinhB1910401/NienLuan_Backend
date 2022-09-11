const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

exports.checkLogin = async (req, res, next) => {
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, 'secret');
        if(!claims) {
            return res.status(401).json({ message: "unauthenticated"});
        }
        const user = await User.findOne({_id: claims._id});
        if(user) { 
            next();
        }
    } catch (e) {
        return res.status(401).json({ message: "unauthenticated"});
    }
}