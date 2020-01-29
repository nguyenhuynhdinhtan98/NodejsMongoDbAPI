const express = require("express");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    var token = jwt.sign({ id: user.id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
