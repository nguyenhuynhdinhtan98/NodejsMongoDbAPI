const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  console.log(user);
  res.send("Login");
});
module.exports = router;
