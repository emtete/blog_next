const express = require("express");
const postRouter = require("./routes/post");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);
//   res.write("hello node");
//   res.end("Hello node");
// });

app.listen(3065, () => {
  console.log("서버 실행 중..");
});
