const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.error("JWT secret key is not set");
    throw new Error("JWT secret key is not set");
    process.exit(1);
  }
};
