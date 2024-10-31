const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login.html");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.redirect("/confirmation.html");
    } else {
      res.status(400).send("Invalid login");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
});

module.exports = router;
