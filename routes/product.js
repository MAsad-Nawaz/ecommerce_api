const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Product = require("../models/Product");

//CREATE Product
router.post("/", verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body);
    try {
        const saveProduct = await newProduct.save();
        return res.status(200).json(saveProduct);
    } catch (err) {
        return res.status(400).json(err);
    }

});

//UPDATE Product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateProduct);
    } catch (err) {
        return res.status(400).json(err);
    }

});

//DELETE Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Product has been deleted ..." });
    } catch (err) {
        return res.status(400).json(err);
    }
});

//Get Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json(err);
    }
});

//Get All Products
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find.sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            });
        } else {
            products = await Product.find();
        }
        return res.status(200).json(products);
    } catch (err) {
        return res.status(400).json(err);
    }
});


module.exports = router;