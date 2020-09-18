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
  const parentIds = {};
  try {
    for (let i in appended) {
      if (appended[i].depth == 1) {
        const node = await Category.create(getObj(appended[i], userId));
        parentIds[appended[i].id] = node.id;
      }
    }
    for (let i in appended) {
      if (appended[i].depth == 2) {
        appended[i].parent = parentIds[appended[i].parent];
        await Category.create(getObj(appended[i], userId));
      }
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

router.get("/getList", async (req, res, next) => {
  try {
    const category = await Category.findAll({
      // attributes: {
      //   exclude: ["content"],
      // },
    });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

module.exports = router;
