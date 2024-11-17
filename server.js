const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    // Tạo thư mục uploads nếu chưa tồn tại
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Khởi tạo multer với cấu hình lưu trữ đã định nghĩa
const upload = multer({ storage: storage });

app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "upload.html"));
});

// Định tuyến để xử lý upload file
app.post("/uploadfile", upload.single("file"), (req, res) => {
  if (req.file) {
    res.send("Tải file thành công!");
  } else {
    res.send("Tải file thất bại.");
  }
});
