const jwt = require("jsonwebtoken");
const config = require("config");

function isUserAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Your are not authorized");

  next();
}

module.exports = isUserAdmin;
