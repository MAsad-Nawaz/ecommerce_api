const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const { username, email } = req.body;
    const orginalPassword = req.body.password;
    if (!username) {
        return res.status(400).json({ msg: "username is required!" });
    } else if (!email) {
        return res.status(400).json({ msg: "email is required!" });
    } else if (!orginalPassword) {
        return res.status(400).json({ msg: "password is required!" });
    };

    // Check for existing User
    const userExist = await User.findOne({ email })

    if (userExist) {
        return res.status(400).json({ msg: "User already exit" });
    };

    const newUser = new User({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(orginalPassword, process.env.PASSWORD_SEC).toString(),

    });
    try {
        const savedUser = await newUser.save();
        const { password, ...others } = savedUser._doc;
        return res.status(200).json(others);
    } catch (err) {
        res.status(400).json(err);
    };

});

router.post('/login', async (req, res) => {
    const { email } = req.body;
    const orginalPassword = req.body.password;
    if (!email) {
        return res.status(400).json({ msg: "email is required!" });
    } else if (!orginalPassword) {
        return res.status(400).json({ msg: "password is required!" });
    };

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "user does not exist!" });
        };

        var hashedPasswaord = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SEC);
        const decryptedPassword = hashedPasswaord.toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== orginalPassword) {
            return res.status(401).json({ msg: "Wrong credentials" });
        };

        // Jwt token After user confirmation
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,

        }, process.env.JWT_SEC, {
            expiresIn: "3d"
        });

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });

    } catch (err) {
        return res.status(400).json(err)
    }

});



module.exports = router;