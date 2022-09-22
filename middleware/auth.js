const config = process.env;
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies['auth-token'];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    if(!user) {
      return res.status(401).send("No user exists with this token");
    }
    req.user = user;
    req.token = token;
  } catch (err) {
    return res.status(401).send("Invalid Token"+err.message);
  }
  return next();
};

module.exports = verifyToken;