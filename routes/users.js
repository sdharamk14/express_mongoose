const { Router } = require("express");
const { User } = require("../model/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const authenticateUser = require("../middlewares/auth");
const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.get("/me", authenticateUser, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) return res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  user = new User({
    name,
    email,
    password: hashed,
  });

  user = await user.save();
  const token = user.generateAuthToken();
  user = _.pick(user, ["name", "email"]);

  res.header("x-auth-token", token).send(user);
});

module.exports = router;
