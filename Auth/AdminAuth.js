exports.login = (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;
  if (username === "" || password === "") {
    return res.json({ message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
  } else {
    if (username === "admin" && password === "admin") {
      return res.json({ message: "เข้าสู่ระบบสำเร็จ", status: "success" });
    } else {
      return res.json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
  }
  //   res.status(200).json({ message: "Admin login" });
};
