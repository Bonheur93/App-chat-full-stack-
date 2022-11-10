const jwt = require("jwt-then")

module.exports = async (req, res, next) => {
    const token = req.header.authorization.split("")[1];

    const payload = await jwt.verify(token, process.env.SECRET)
    next();
}