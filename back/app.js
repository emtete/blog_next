const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const margan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");

const db = require("./models");
const passportConfig = require("./passport");
const app = express();

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  // app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}

// app.use는 express 서버에 다른 기능을 장착한다는 의미.
// 순서 중요.
// credentials -> 서로 다른 도메인 간 쿠키를 전달 할 수 없는데, 그걸 허용해준다.
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); // json 데이터를 req.body 안에 넣어준다.
app.use(express.urlencoded({ extended: true })); // form 데이터, url encoding된 데이터를  req.body에 넣어준다.
app.use(cookieParser("next_blog_secret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

// app.get("/api", (req, res) => {
//   res.send("hello api");
// });

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);

app.listen(80, () => {
  console.log("서버 실행 중..");
});
