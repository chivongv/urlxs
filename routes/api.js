const express = require("express");
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require("../models/Url");

// @route POST /api/shorten/{json}
// @desc Post url to shorten
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  const BASE_URL = require('../config').BASE_URL;

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json("Invalid long url");
  }

  const urlCode = shortid.generate();

  try {
    let url = await Url.findOne();
    if(url) res.json(url)
    else {
      const shortUrl = BASE_URL + "/" + urlCode;
      url = new Url({
        urlCode,
        longUrl,
        shortUrl,
        date: new Date()
      });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.log("Something went wrong to shorten url...");
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
