const ApiError = require("../api-error");
const User = require("../models/user.model");
const Product = require("../models/product.model");

exports.getAllProduct = async (req, res) => {

    try {
        const products = await Product.find();
        const data = products;
        return res.status(200).json({data});
    } catch (err) {
        return res.status(200).json({message: err.message});
    }

    
};

exports.addProduct = async (req, res) => {

    const product = req.body;
    product.image = req.file.filename;
    try {
        await Product.create(product);
        return res.status(200).json({message: "success"});
    } catch (err) {
        return res.status(200).json({message: err.message});
    }
};

