const courses = require("./courses");
const home = require("./home");
const genres = require("./genres");
const customers = require("./customers");
const authors = require("./authors");
const books = require("./books");
const movies = require("./movies");
const rentals = require("./rentals");
const users = require("./users");
const auth = require("./auth");
const error = require("../middlewares/error");
const authenticateUser = require("../middlewares/auth");

const appRoutes = function (app) {
  // app.use("/", isUserAdmin, home);
  app.use("/api/users", users);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  //example for multiple middleware's
  // app.use("/api/courses", [authenticateUser, isUserAdmin], courses);
  app.use("/api/courses", authenticateUser, courses);
  app.use("/api/genres", authenticateUser, genres);
  app.use("/api/customers", authenticateUser, customers);
  app.use("/api/authors", authenticateUser, authors);
  app.use("/api/books", authenticateUser, books);
  app.use("/api/movies", authenticateUser, movies);
  app.use("/api/rentals", authenticateUser, rentals);

  //error middleware handling
  app.use(error);
};

module.exports = appRoutes;
