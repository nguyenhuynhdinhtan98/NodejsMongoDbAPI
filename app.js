require("./Models/UserSchema");
//require("./Models/TrackSchema");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./authRoutes");
const requireAuth = require("./requireAuth");
const trackRoutes = require("./trackRoutes");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(trackRoutes);
app.use(router);
const uri =
  "mongodb+srv://sa:sapassword@cluster0-zyhfa.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on("connected", () => {
  console.log("Connect");
});
mongoose.connection.on("error", err => {
  console.log("Err :", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Start ${req.user.email}`);
});

app.listen(3000, function() {
  console.log("Express listening on port", this.address().port);
});
