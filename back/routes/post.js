const express = require("express");

const { Post } = require("../models");

const router = express.Router();

router.post("/write", async (req, res, next) => {
  try {
    await Post.create(req.body.data);
    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

// router.delete("/", (req, res) => {
//   res.json({ id: 1 });
// });

module.exports = router;
