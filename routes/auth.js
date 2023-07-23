const router = require('express').Router();
const User = require('../model/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECR // Use a static secret key here
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json('Username Mismatch!');
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECR // Use the same static secret key for decryption
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json('Wrong Password!');
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC // Use your JWT secret here
        );

        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken });
    } catch (e) {
        console.log(e); // Add this line to log the error to the console
        res.status(500).json("Server Error");
    }
});

module.exports = router;
