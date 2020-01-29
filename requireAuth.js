const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const User = mongoose.model("User");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "You must be login 1" });
  }
  jwt.verify(authorization, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send(err.message);
    } else {
      const user = await User.findById(payload.id);
      req.user = user;
      next();
    }
  });
};
