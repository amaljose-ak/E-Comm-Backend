const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
    
    const AuthHeader = req.headers.token;
    if (AuthHeader) {
        const token = AuthHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return res.status(403).json("Token is not valid"); // Return error response
            req.user = user;
            next();
        });
    } else { 
        return res.status(401).json("You are not Authorized!");
    }
};

const verifyTokenAndAutherization = (req, res, next) => {
    verifytoken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that");
        }
    });
};

const verifyTokenAdmin = (req, res, next) => {
    verifytoken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do that");
        }
    });
};
module.exports = { verifytoken, verifyTokenAndAutherization,verifyTokenAdmin };
