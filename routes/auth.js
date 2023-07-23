const router = require('express').Router()
const User = require('../model/user')
const CryptoJS=require('crypto-js')

// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECR)
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (error) {
        res.status(500).json(error)
    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json("Username Mismatch !");
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECR
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong Password !");
        }

        const { password, ...others } = user._doc;
        res.status(200).send(others);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router