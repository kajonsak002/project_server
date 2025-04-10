const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const db = require("./config/db");
const path = require("path");

const port = "5000";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/profile", express.static(path.join(__dirname, "public/profile")));

readdirSync("./routes").map((c) => {
  app.use("/api", require("./routes/" + c));
});

app.get("/connect", (req, res) => {
  res.status(200).send("Connected successfully");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
