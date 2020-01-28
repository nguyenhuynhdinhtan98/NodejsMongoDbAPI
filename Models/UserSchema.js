const mongoose = require("mongoose");
const schema = mongoose.Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true }
});
mongoose.model("User", schema);
