const express = require("express");
const {
  animalTpye,
  createAnimalType,
  removeAnimalType,
  editAnimalType,
} = require("../controller/animaltype");
const router = express.Router();

router.post("/animalType", animalTpye);
router.get("/animalType/create", createAnimalType);
router.get("/animalType/delete", removeAnimalType);
router.get("/animalType/edit", editAnimalType);

module.exports = router;
