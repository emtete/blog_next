const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const db = require("../models");

const router = express.Router();

const runningSession = {};

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
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      if (loginErr) {
        req.session.destroy();
        console.error(loginErr);
        return next(loginErr);
      } //
      else if (fullUserWithoutPassword.dataValues.isLoggedIn) {
        req.session.destroy();
        return res.status(400).json("다른기기에서 사용중인 아이디입니다.");
      } //
      else {
        try {
          await updateIsLoggedIn(true, user.id);

          runningSession[req.sessionID] = setTimeout(async () => {
            await updateIsLoggedIn(false, user.id);
            req.session.destroy();
          }, 1000 * 60 * 30);
          return res.status(200).json(fullUserWithoutPassword);
        } catch (err) {
          console.error(err);
          next(err); // status 500
        }
      }
    });
  })(req, res, next);
});

const updateIsLoggedIn = (login, userId) => {
  User.update(
    {
      isLoggedIn: login,
    },
    { where: { id: userId } }
  );
  return true;
};

// next???
// router.post("/signup", async (req, res, next) => {
//   try {
//     const exUser = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (exUser) {
//       return res.status(403).send("이미 사용중인 아이디입니다.");
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 12);

//     await User.create({
//       email: req.body.email,
//       nickname: req.body.nickname,
//       password: hashedPassword,
//       isLoggedIn: false,
//     });
//     res.status(201).send("ok");
//   } catch (error) {
//     console.error(error);
//     next(error); // status 500
//   }
// });

router.post("/logout", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        isLoggedIn: false,
      },
      { where: { id: req.user.id } }
    );
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }

  clearTimeout(runningSession[req.sessionID]);
  delete runningSession[req.sessionID];

  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
