const express = require("express");

const router = express.Router();

router.post("/write", (req, res) => {
  // res.json({ id: 1, content: "hello1" });
  console.log(req.body.data);
  res.status(200).json(null);
});

// router.delete("/", (req, res) => {
//   res.json({ id: 1 });
// });

module.exports = router;
