const express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");
const router = require("./authRoutes");
const app = express();
app.use(router);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
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
