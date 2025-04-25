const db = require("../config/db");

//@ENDPOINT AnimalType
exports.animalTpye = (req, res) => {
  const { animal_id } = req.body;

  if (!animal_id) {
    return res.status(400).json({ message: "Animal ID is required" });
  }
  const sql = "SELECT * FROM animal_types WHERE animal_id = ?";
  db.query(sql, animal_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error :" + err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "AnimalType not found" });
    }
    res.status(200).json(result);
  });
};

exports.createAnimalType = (req, res) => {
  const { name, animal_id } = req.body;

  if (!name || !animal_id) {
    return res.status(400).json({ message: "Name and Animal_id are required" });
  }

  const getMaxIDSql =
    "SELECT MAX(CAST(type_id AS UNSIGNED)) AS max_id FROM animal_types";

  db.query(getMaxIDSql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error: " + err });
    }

    const maxId = result[0].max_id || 0;
    const newIdNum = maxId + 1;

    const newId = String(newIdNum).padStart(3, "0");

    const insertSql =
      "INSERT INTO animal_types (type_id, name, animal_id) VALUES (?, ?, ?)";
    db.query(insertSql, [newId, name, animal_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error: " + err });
      }
      res
        .status(200)
        .json({ message: "เพิ่มประเภทสัตว์เรียบร้อยเเล้ว", id: newId });
    });
  });
};

exports.editAnimalType = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: "ID and Name are required" });
  }

  const sql = "UPDATE animal_types SET name = ? WHERE type_id = ?";
  db.query(sql, [name, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error: " + err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "AnimalType not found" });
    }
    res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
  });
};

exports.removeAnimalType = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const sql = "DELETE FROM animal_types WHERE type_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error: " + err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "AnimalType not found" });
    }
    res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
  });
};
