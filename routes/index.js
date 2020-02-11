const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require("../models/Url");

// @route GET /
// @desc Returns html-page with input to shorten url
router.get('/', (req, res) => {
  res.render('../static/index');
});

// @route GET /:code
// @desc Redirect user to original url
router.get('/:code', async (req, res) => {
  try{
    const url = await Url.findOne({urlCode: req.params.code});

    if(url){
      return res.redirect(url.longUrl);
    }else{
      return res.status(404).json("No url found.");
    }
  }catch(err){
    console.log("Server error...");
    console.error(err);
    return res.status(500).json("Server error...");
  }
});

module.exports = router;
