const mongoose = require("mongoose");

const mongooseObj = mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log("connection failed" + err.message));

exports.mongooseObj;
