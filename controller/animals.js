const db = require("../config/db");
// console.log(db);
//@ENDPOINT Animal
exports.animal = (req, res) => {
  const sql = "SELECT * FROM animals";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error :" + err });
    }
    res.status(200).json(result);
  });
};

exports.create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name and Type ID are required" });
  }

  const getMaxIDSql =
    "SELECT MAX(CAST(animal_id AS UNSIGNED)) AS max_id FROM animals";
  db.query(getMaxIDSql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error: " + err });
    }

    const maxId = result[0].max_id || 0;
    const newIdNum = maxId + 1;

    const newId = String(newIdNum).padStart(3, "0");

    const insertSql = "INSERT INTO animals (animal_id, name) VALUES (?, ?)";
    db.query(insertSql, [newId, name], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error: " + err });
      }
      res.status(200).json({ message: "เพิ่มสัตว์เรียบร้อยเเล้ว", id: newId });
    });
  });
};

exports.edit = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ message: "ID and Name are required" });
  }

  const sql = "UPDATE animals SET name = ? WHERE animal_id = ?";
  db.query(sql, [name, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error: " + err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
  });
};

exports.remove = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const sql = "DELETE FROM animals WHERE animal_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error: " + err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
  });
};
