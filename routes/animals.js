const express = require("express");
const { animal, remove, edit, create } = require("../controller/animals");
const router = express.Router();

router.get("/animals", animal);
router.get("/animals/create", create);
router.get("/animals/delete", remove);
router.get("/animals/edit", edit);

module.exports = router;
