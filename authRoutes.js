const express = require("express");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const router = express.Router();
const User = mongoose.model("User");
router.post("/signup", async (req, res) => {
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
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Email not found");
  } else {
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return res.status(401).send("Inavalid Email and Password");
      } else {
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		res.send({ token });
      }
    });
  }
});
module.exports = router;