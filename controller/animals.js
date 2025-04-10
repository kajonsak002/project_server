//@ENDPOINT Animal
exports.animal = (req, res) => {
  res.send("animal controller");
};

exports.create = (req, res) => {
  res.send("Animal Create");
};

exports.edit = (req, res) => {
  try {
    const { id } = req.body;
    res.status(200).json({ message: `Animal Edit ID ${id}` });
  } catch (err) {
    return res.status(500).json({ message: "Error :" + err });
  }
};

exports.remove = (req, res) => {
  try {
    const { id } = req.body;
    res.status(200).json({ message: `Animal Remove ID ${id}` });
  } catch (err) {
    return res.status(500).json({ message: "Error : " + err });
  }
};
