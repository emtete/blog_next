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
    isCard: node.isCard,
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
        const newParentId = parentIds[appended[i].parent];
        if (newParentId) appended[i].parent = newParentId;
        await Category.create(getObj(appended[i], userId));
      }
    }
    for (let i in updated) {
      const willUpdate = getObj(updated[i]);
      delete willUpdate.UserId;
      if (parseInt(willUpdate.parent) < 0) {
        willUpdate.parent = parentIds[willUpdate.parent];
      }
      await Category.update(willUpdate, { where: { id: updated[i].id } });
    }
    for (let i in deleted) {
      await Category.destroy({ where: { id: deleted[i] } });
    }
    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.get("/getList", async (req, res, next) => {
  try {
    const query = req.query;
    const searchCondition = {
      order: [
        ["depth", "ASC"],
        ["parent", "ASC"],
        ["priority", "ASC"],
      ],
    };
    if (query && query.userId !== undefined) {
      searchCondition["where"] = { UserId: query.userId };
    }
    const category = await Category.findAll(searchCondition);

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

module.exports = router;
