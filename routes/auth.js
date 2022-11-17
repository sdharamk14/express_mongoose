const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();
const { User } = require("../model/users");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token); 
});

module.exports = router;
