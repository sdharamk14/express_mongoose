const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

const logging = function () {
  // Handling uncaught exceptions - will use winston exception handle fn
  // process.on("uncaughtException", (ex) => {
  //   console.log("Uncaught exception -", ex.message);
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  // Handling unhandled promise rejections
  process.on("unhandledRejection", (ex) => {
    // winston.error(ex.message, ex);
    //throw exception so window exception handle will catch it
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/playground",
      level: "info",
    })
  );

  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
};
