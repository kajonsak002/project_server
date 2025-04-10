const express = require("express");
const router = express.Router();

router.get("/post", (req, res) => {
  res.send("API All Post");
});

module.exports = router;
