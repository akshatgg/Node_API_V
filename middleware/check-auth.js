const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_KEY);
        if (req.user.environment !== process.env.NODE_ENV){
            return res.status(401).json({
                status: "failed",
                message: 'invalid auth token'
            });
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: "failed",
            message: 'invalid auth token'
        });
    }
};
