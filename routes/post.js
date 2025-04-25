const express = require("express");
const { edit, create, get_post } = require("../controller/post");
const router = express.Router();

router.get("/posts", get_post);
router.get("/post/create", create);
router.get("/post/edit", edit);

module.exports = router;
