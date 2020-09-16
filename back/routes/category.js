const express = require("express");

const { Category } = require("../models");

const router = express.Router();

router.post("/write", async (req, res, next) => {
  const data = req.body.data;
  console.log(data);
  try {
    // await Post.create(req.body.data);
    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

module.exports = router;
