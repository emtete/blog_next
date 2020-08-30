const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.post("/api/post", (req, res) => {
  res.json([
    { id: 1, content: "hello1" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
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
