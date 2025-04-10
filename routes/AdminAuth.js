const express = require("express");
const { login } = require("../Auth/AdminAuth");
const router = express.Router();

router.post("/admin/login", login);

module.exports = router;
