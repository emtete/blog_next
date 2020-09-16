const express = require("express");

const { Category } = require("../models");

const router = express.Router();

const getObj = (node, userId) => {
  return {
    title: node.title,
    entries: node.entries,
    priority: node.priority,
    depth: node.depth,
    parent: node.parent,
    UserId: userId,
  };
};

router.post("/apply", async (req, res, next) => {
  const appended = req.body.data.appended;
  const updated = req.body.data.updated;
  const deleted = req.body.data.deleted;
  const userId = req.body.data.userId;
  try {
    for (let i in appended) {
      await Category.create(getObj(appended[i], userId));
    }
    // for (let node in updated) {
    //   await Category.create(getObj(node, userId));
    // }
    // for (let node in deleted) {
    //   await Category.create(getObj(node, userId));
    // }
    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

module.exports = router;
