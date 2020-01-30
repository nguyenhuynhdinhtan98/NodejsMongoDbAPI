const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Track = mongoose.model("Track");
const requireAuth = require("./requireAuth");
router.use(requireAuth);
router.post("/tracks", async (req, res) => {
  try {
    const { name, location } = req.body;
    console.log(req.body);
    //const trackObj = new Track({ name, location, userid: req.user._id });
    // await trackObj.save();
    //res.send(trackObj);
    const tracks = await Track.find({ userid: req.user._id });
    await res.send(tracks);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
