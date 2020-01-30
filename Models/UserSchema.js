const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true }
});
schema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
mongoose.model("User", schema);
