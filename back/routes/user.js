const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const db = require("../models");

const router = express.Router();

// 클라이언트에서 새로고침 할 경우 실행된다.
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 미들웨어 확장
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    //passport 처리
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// next???
router.post("/signup", async (req, res, next) => {
  try {
    // console.log("test : ", req.body.email);
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
