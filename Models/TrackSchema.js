const mongoose = require("mongoose");
const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longtitude: Number,
    altitude: Number,
    acrcuracy: Number,
    heading: Number,
    speed: Number
  }
});
const schema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, default: "" },
  location: [pointSchema]
});
mongoose.model("Track", schema);
