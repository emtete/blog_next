const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

// app.use는 express 서버에 다른 기능을 장착한다는 의미.
// 순서 중요.
app.use(cors({ origin: "*" }));
app.use(express.json()); // json 데이터를 req.body 안에 넣어준다.
app.use(express.urlencoded({ extended: true })); // form 데이터, url encoding된 데이터를  req.body에 넣어준다.
app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

// app.get("/api", (req, res) => {
//   res.send("hello api");
// });

// app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중..");
});
