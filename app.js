require("./Models/UserSchema");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./authRoutes");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
app.get("/", (req, res) => {
  res.send("Start");
});
app.listen(3000, function() {
  console.log("info", "Server is running at port : " + 3000);
});
