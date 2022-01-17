const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({ error: {
        message: "No token, no valid permit"
    }})

    //* token validation
    try {
        const cipher = jwt.verify(token, process.env.SECRET_KEY)

        req.user = cipher.user;
        next();
    } catch (error) {
        res.status(401).json({
            error: {
                message: "No valid token"
            }
        })
    }
}

module.exports = authenticate;