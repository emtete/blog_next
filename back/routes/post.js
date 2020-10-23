const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post } = require("../models");
const { Category } = require("../models");
const { search } = require("./category");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (err) {
  fs.mkdirSync("uploads");
}

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
        imagePath: data.imagePath,
      },
      { where: { id: data.id } }
    );

    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    await Post.destroy({
      where: { id: req.params.postId },
    });

    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    // res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.post("/changeCategory", async (req, res, next) => {
  const data = req.body.data;
  const CategoryId = data.CategoryId;
  const categoryName = data.categoryName;
  const postIdArr = data.postIdArr;
  try {
    for (let i in postIdArr) {
      await Post.update(
        {
          CategoryId,
          categoryName,
        },
        { where: { id: postIdArr[i] } }
      );
    }

    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

// changeCategory
router.post("/setNotice", async (req, res, next) => {
  const data = req.body.data;
  const isNotice = data.isNotice;
  const id = data.id;

  try {
    // for (let i in postIdArr) {
    await Post.update(
      {
        isNotice,
      },
      { where: { id } }
    );
    // }

    res.status(201).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.get("/getList", async (req, res, next) => {
  try {
    const query = req.query;
    const where = {};
    const searchCondition = {
      where,
      // order: [["priority", "ASC"]],
    };
    if (query && !query.includeContent) {
      searchCondition["attributes"] = {
        exclude: ["content"],
      };
    }

    if (query && query.isNotice !== undefined) {
      where["isNotice"] = query.isNotice;
    }

    if (query && query.CategoryId !== undefined) {
      where["CategoryId"] = query.CategoryId;
    }

    if (query && query.userId !== undefined) {
      where["UserId"] = query.userId;
    }
    const post = await Post.findAll(searchCondition);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

router.get("/getScrollList", async (req, res, next) => {
  try {
    const query = req.query;
    const where = {};
    const searchCondition = {
      where,
      order: [
        ["isNotice", "DESC"],
        ["id", "DESC"],
      ],
      // limit: [10, 10],
      // limit: [20],
    };
    // where["isNotice"] = 0;

    // if (query && query.lastId !== undefined && query.lastId != -1) {
    //   where["id"] = { [Op.lt]: parseInt(query.lastId, 10) };
    // }
    // numberOfRequest
    if (query && query.numberOfRequest !== undefined) {
      const num = parseInt(query.numberOfRequest);
      searchCondition.limit = [num, 10];
    } else {
      searchCondition.limit = [10];
    }

    if (query && query.CategoryId !== undefined) {
      where["CategoryId"] = query.CategoryId;
    }

    if (query && query.userId !== undefined) {
      where["UserId"] = query.userId;
    }
    const post = await Post.findAll(searchCondition);
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

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출 .png
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    res.json(req.files.map((v) => v.filename));
  }
);

module.exports = router;
