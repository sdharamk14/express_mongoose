const mongoose = require("mongoose");
const winston = require("winston");

const mongooseObj = mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    winston.info("connected to mongodb");
  });
//Not required as unhandled promise rejection is done on app level
// .catch((err) => console.log("connection failed" + err.message));

exports.mongooseObj;
