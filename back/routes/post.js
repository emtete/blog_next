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

router.post("/update", async (req, res, next) => {
  const data = req.body.data;
  try {
    await Post.update(
      {
        title: data.title,
        content: data.content,
        categoryName: data.categoryName,
        categoryId: data.categoryId,
      },
      { where: { id: data.id } }
    );

    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.get("/getList", async (req, res, next) => {
  try {
    const post = await Post.findAll({
      attributes: {
        exclude: ["content"],
      },
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.get("/getOne", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.query.id },
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

module.exports = router;
