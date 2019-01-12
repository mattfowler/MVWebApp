const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

function validate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        if (!token)
            return res.status(401).send({message: 'Token must be provided.'});
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if (err)
                return res.status(401).send({message: 'Invalid token.'});
            else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        return res.status(401).send({message: 'Bearer token must be provided.'});
    }

}

module.exports = validate;
module.exports.TOKEN_SECRET = TOKEN_SECRET;